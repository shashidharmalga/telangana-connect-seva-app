-- Fix critical security vulnerability: Restrict expenses table access to user's own records only

-- First, drop all existing overly permissive policies
DROP POLICY IF EXISTS "Allow insert for all" ON public.expenses;
DROP POLICY IF EXISTS "Allow read for all" ON public.expenses;
DROP POLICY IF EXISTS "Delete for all" ON public.expenses;
DROP POLICY IF EXISTS "Update for all" ON public.expenses;

-- Make user_id column NOT NULL and set proper default
ALTER TABLE public.expenses 
ALTER COLUMN user_id SET NOT NULL,
ALTER COLUMN user_id SET DEFAULT auth.uid();

-- Create secure RLS policies that only allow users to access their own records
CREATE POLICY "Users can view their own expenses" 
ON public.expenses 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own expenses" 
ON public.expenses 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own expenses" 
ON public.expenses 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own expenses" 
ON public.expenses 
FOR DELETE 
USING (auth.uid() = user_id);