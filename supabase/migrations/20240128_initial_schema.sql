-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create blog_posts table
create table public.blog_posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text not null,
  slug text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  published boolean default false not null,
  excerpt text,
  cover_image text
);

-- Create works table
create table public.works (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  image_url text,
  link text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  tags text[]
);

-- Set up Row Level Security (RLS)
alter table public.blog_posts enable row level security;
alter table public.works enable row level security;

-- Create policies
create policy "Public blog posts are viewable by everyone"
  on public.blog_posts for select
  using (published = true);

create policy "Public works are viewable by everyone"
  on public.works for select
  using (true);

-- Create indexes
create index blog_posts_slug_idx on public.blog_posts (slug);
create index blog_posts_created_at_idx on public.blog_posts (created_at desc);
create index works_created_at_idx on public.works (created_at desc); 