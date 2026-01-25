---user profile schema---
create table public.profiles (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp without time zone null default now(),
  name text null,
  email text null,
  phone text null,
  user_id uuid not null default auth.uid (),
  first_time boolean null default true,
  constraint profile_pkey primary key (id),
  constraint profile_user_id_key unique (user_id)
) TABLESPACE pg_default;

---subscription_posts schema---
create table public.subscription_posts (
  id uuid not null default gen_random_uuid (),
  post_type text not null,
  platform text not null,
  title text not null,
  description text null,
  owner_id uuid not null,
  total_slots integer null,
  filled_slots integer null default 0,
  price_per_user numeric(10, 2) null,
  group_status text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  platform_type text null,
  tags text[] null,
  expiry_date date null,
  constraint subscription_posts_pkey primary key (id),
  constraint subscription_posts_owner_id_fkey1 foreign KEY (owner_id) references profiles (user_id) on update CASCADE on delete CASCADE,
  constraint subscription_posts_group_status_check check (
    (
      group_status = any (
        array['FORMING'::text, 'ACTIVE'::text, 'FAILED'::text]
      )
    )
  ),
  constraint subscription_posts_post_type_check check (
    (
      post_type = any (
        array['OFFERING'::text, 'REQUEST'::text, 'GROUP'::text]
      )
    )
  )
) TABLESPACE pg_default;