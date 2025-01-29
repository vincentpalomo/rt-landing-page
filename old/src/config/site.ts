import { SiteConfig } from '@/types'

export const siteConfig: SiteConfig = {
  name: 'Portfolio & Blog',
  description:
    'A modern portfolio and blog platform built with Next.js, Supabase, and TailwindCSS.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/og.jpg',
  links: {
    twitter: 'https://twitter.com/yourusername',
    github: 'https://github.com/yourusername',
  },
}

export const navItems = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Blog',
    href: '/blog',
  },
  {
    title: 'Works',
    href: '/works',
  },
] 