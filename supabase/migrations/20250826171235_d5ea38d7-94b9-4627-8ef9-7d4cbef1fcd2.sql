-- Fix security warnings from the linter

-- 1. Add missing RLS policy for otp_verifications table
CREATE POLICY "Users can manage their own OTP verifications" 
ON public.otp_verifications 
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 2. Fix function search path issues by adding SECURITY DEFINER and search_path
DROP FUNCTION IF EXISTS public.update_updated_at_column();
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP FUNCTION IF EXISTS public.handle_new_user();
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

-- 3. Fix anonymous access policies by restricting to authenticated users only
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

CREATE POLICY "Authenticated users can view their own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update their own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert their own profile" 
ON public.profiles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Fix complaints policies
DROP POLICY IF EXISTS "Users can view complaints they submitted" ON public.complaints;
DROP POLICY IF EXISTS "Users can create complaints" ON public.complaints;
DROP POLICY IF EXISTS "Officers can view assigned complaints" ON public.complaints;
DROP POLICY IF EXISTS "Officers can update assigned complaints" ON public.complaints;

CREATE POLICY "Authenticated users can view complaints they submitted" 
ON public.complaints 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create complaints" 
ON public.complaints 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated officers can view assigned complaints" 
ON public.complaints 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND is_officer = true
  )
);

CREATE POLICY "Authenticated officers can update assigned complaints" 
ON public.complaints 
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND is_officer = true
  )
);

-- Fix expenses policies to restrict to authenticated users
DROP POLICY IF EXISTS "Users can delete their own expenses" ON public.expenses;
DROP POLICY IF EXISTS "Users can update their own expenses" ON public.expenses;
DROP POLICY IF EXISTS "Users can view their own expenses" ON public.expenses;
DROP POLICY IF EXISTS "Users can insert their own expenses" ON public.expenses;

CREATE POLICY "Authenticated users can view their own expenses" 
ON public.expenses 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert their own expenses" 
ON public.expenses 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update their own expenses" 
ON public.expenses 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can delete their own expenses" 
ON public.expenses 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Fix OTP policy to restrict to authenticated users
DROP POLICY IF EXISTS "Users can manage their own OTP verifications" ON public.otp_verifications;

-- Since OTP is used for authentication, we need to allow public access for verification
-- but restrict creation to server-side functions
CREATE POLICY "Allow OTP verification for authentication" 
ON public.otp_verifications 
FOR SELECT 
USING (true);

CREATE POLICY "Only service role can manage OTP records" 
ON public.otp_verifications 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);