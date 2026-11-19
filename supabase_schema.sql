-- ========================================================
-- termgame Supabase Database Schema
-- Run this script in Supabase Dashboard -> SQL Editor -> New query
-- ========================================================

-- 1. Create or Update Profiles table with Username & Password
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  username text unique,
  password text,
  display_name text,
  avatar_url text,
  coins_balance int default 250,
  role text default 'customer',
  created_at timestamp with time zone default now()
);

-- Ensure columns exist if table was already created earlier
alter table public.profiles add column if not exists username text unique;
alter table public.profiles add column if not exists password text;
alter table public.profiles add column if not exists coins_balance int default 250;

-- 2. Create Orders table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_no text unique not null,
  user_id uuid references public.profiles(id) on delete set null,
  game_id text not null, -- 'pubg' or 'valorant'
  player_id text not null, -- UID or Riot ID
  in_game_name text,
  package_name text not null,
  price numeric(10,2) not null,
  payment_method text not null, -- 'promptpay' or 'truemoney'
  payment_status text default 'paid',
  delivery_status text default 'completed',
  coins_earned int default 0,
  created_at timestamp with time zone default now()
);

-- 3. Create Saved Accounts table
create table if not exists public.saved_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  game_id text not null,
  player_id text not null,
  in_game_name text,
  created_at timestamp with time zone default now()
);

-- 4. Enable Row Level Security (RLS) & Policies for public access (anon)
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.saved_accounts enable row level security;

-- Policies for orders (Allow customers to create and view orders)
drop policy if exists "Allow public select orders" on public.orders;
create policy "Allow public select orders" on public.orders for select to anon using (true);

drop policy if exists "Allow public insert orders" on public.orders;
create policy "Allow public insert orders" on public.orders for insert to anon with check (true);

-- Policies for profiles (Allow customers to register, login and view profile)
drop policy if exists "Allow public select profiles" on public.profiles;
create policy "Allow public select profiles" on public.profiles for select to anon using (true);

drop policy if exists "Allow public insert profiles" on public.profiles;
create policy "Allow public insert profiles" on public.profiles for insert to anon with check (true);

drop policy if exists "Allow public update profiles" on public.profiles;
create policy "Allow public update profiles" on public.profiles for update to anon using (true);
