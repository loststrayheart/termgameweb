-- ============================================================
-- termgame: Fix Supabase Permissions (Run this in SQL Editor)
-- ============================================================

-- STEP 1: Grant schema usage to anon role
GRANT USAGE ON SCHEMA public TO anon;

-- STEP 2: Grant table permissions to anon role
GRANT SELECT, INSERT ON public.orders TO anon;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO anon;
GRANT SELECT, INSERT ON public.saved_accounts TO anon;

-- STEP 3: Ensure profiles has all needed columns
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS username text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS password text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS display_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS coins_balance int DEFAULT 250;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role text DEFAULT 'customer';

-- STEP 4: Make username unique (ignore if already exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'profiles_username_key'
  ) THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_username_key UNIQUE (username);
  END IF;
END $$;

-- STEP 5: Ensure RLS is enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_accounts ENABLE ROW LEVEL SECURITY;

-- STEP 6: Re-create RLS policies (drop + create to avoid duplicates)
DROP POLICY IF EXISTS "Allow public select orders" ON public.orders;
CREATE POLICY "Allow public select orders" ON public.orders FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Allow public insert orders" ON public.orders;
CREATE POLICY "Allow public insert orders" ON public.orders FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public select profiles" ON public.profiles;
CREATE POLICY "Allow public select profiles" ON public.profiles FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Allow public insert profiles" ON public.profiles;
CREATE POLICY "Allow public insert profiles" ON public.profiles FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update profiles" ON public.profiles;
CREATE POLICY "Allow public update profiles" ON public.profiles FOR UPDATE TO anon USING (true);

DROP POLICY IF EXISTS "Allow public select saved_accounts" ON public.saved_accounts;
CREATE POLICY "Allow public select saved_accounts" ON public.saved_accounts FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Allow public insert saved_accounts" ON public.saved_accounts;
CREATE POLICY "Allow public insert saved_accounts" ON public.saved_accounts FOR INSERT TO anon WITH CHECK (true);

-- Done!
SELECT 'Permissions fixed successfully!' AS status;
