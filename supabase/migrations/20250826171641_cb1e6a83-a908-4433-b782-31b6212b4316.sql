-- Secure otp_verifications with strict RLS (service role only)
-- 1) Enable and force RLS
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otp_verifications FORCE ROW LEVEL SECURITY;

-- 2) Drop any previous policies we might have created with the same names
DROP POLICY IF EXISTS "Service role can select otp_verifications" ON public.otp_verifications;
DROP POLICY IF EXISTS "Service role can insert otp_verifications" ON public.otp_verifications;
DROP POLICY IF EXISTS "Service role can update otp_verifications" ON public.otp_verifications;
DROP POLICY IF EXISTS "Service role can delete otp_verifications" ON public.otp_verifications;

-- 3) Create restrictive policies (deny-by-default; allow only service role)
CREATE POLICY "Service role can select otp_verifications"
ON public.otp_verifications
FOR SELECT
USING (auth.role() = 'service_role');

CREATE POLICY "Service role can insert otp_verifications"
ON public.otp_verifications
FOR INSERT
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can update otp_verifications"
ON public.otp_verifications
FOR UPDATE
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can delete otp_verifications"
ON public.otp_verifications
FOR DELETE
USING (auth.role() = 'service_role');