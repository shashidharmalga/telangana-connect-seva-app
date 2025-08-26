-- Create profiles table for officer information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  employee_id TEXT NOT NULL UNIQUE,
  gov_field TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  is_officer BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create complaints table with proper security
CREATE TABLE public.complaints (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  officer_id UUID REFERENCES public.profiles(user_id),
  district TEXT NOT NULL,
  village TEXT NOT NULL,
  issue_type TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  priority TEXT NOT NULL DEFAULT 'medium',
  submitted_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  escalated_at TIMESTAMP WITH TIME ZONE,
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on complaints
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for complaints
CREATE POLICY "Users can view complaints they submitted" 
ON public.complaints 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create complaints" 
ON public.complaints 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Officers can view assigned complaints" 
ON public.complaints 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND is_officer = true
  )
);

CREATE POLICY "Officers can update assigned complaints" 
ON public.complaints 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND is_officer = true
  )
);

-- Create OTP verification table
CREATE TABLE public.otp_verifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number TEXT NOT NULL,
  otp_hash TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on OTP verifications
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_complaints_updated_at
  BEFORE UPDATE ON public.complaints
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Only create profile if user metadata indicates they are an officer
  IF NEW.raw_user_meta_data->>'is_officer' = 'true' THEN
    INSERT INTO public.profiles (
      user_id, 
      employee_id, 
      gov_field,
      first_name,
      last_name,
      is_officer
    ) VALUES (
      NEW.id,
      NEW.raw_user_meta_data->>'employee_id',
      NEW.raw_user_meta_data->>'gov_field',
      NEW.raw_user_meta_data->>'first_name',
      NEW.raw_user_meta_data->>'last_name',
      true
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();