# Portfolio & Blog Platform

A modern, secure portfolio platform with blog capabilities and protected content areas. Built with Next.js, Supabase, and TailwindCSS.

## Project Overview

### Features
- 🎨 Responsive portfolio showcase
- ✍️ Blog platform with MDX support
- 🔒 Password-protected works section
- 🔄 Real-time content updates
- 📱 Mobile-first design
- 🎯 SEO optimized
- 📝 Content management system

### Tech Stack
- **Frontend:** Next.js, React, TailwindCSS
- **Backend:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Content:** MDX
- **Hosting:** Vercel
- **Storage:** Supabase Storage

## Getting Started

### Prerequisites
```bash
Node.js >= 14.0.0
npm >= 6.0.0
```

### Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-platform.git
cd portfolio-platform
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_WORKS_PASSWORD=your_protected_page_password
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure
```
portfolio/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   │   ├── blog/        # Blog-related components
│   │   ├── layout/      # Layout components
│   │   └── works/       # Works-related components
│   ├── lib/             # Utility functions
│   └── types/           # TypeScript types
├── public/              # Static assets
└── supabase/           # Supabase configuration
```

## Database Schema

### Blog Posts Table
```sql
create table blog_posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text not null,
  slug text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  published boolean default false not null,
  excerpt text,
  cover_image text
);
```

### Works Table
```sql
create table works (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  image_url text,
  link text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  tags text[]
);
```

## Features

### Blog Platform
- MDX support for rich content
- Code syntax highlighting
- Cover images
- Excerpts for previews
- Publishing workflow

### Works Portfolio
- Password protection
- Image gallery
- Project tags
- External links
- Responsive grid layout

### SEO & Performance
- Server-side rendering
- Dynamic sitemap
- Meta tags
- OpenGraph images
- PWA support

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details. 