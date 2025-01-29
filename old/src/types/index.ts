import { z } from 'zod'

export const blogPostSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  slug: z.string(),
  created_at: z.string().datetime(),
  published: z.boolean().default(false),
  excerpt: z.string().optional(),
  cover_image: z.string().optional(),
})

export const workSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  image_url: z.string().optional(),
  link: z.string().optional(),
  created_at: z.string().datetime(),
  tags: z.array(z.string()).optional(),
})

export type BlogPost = z.infer<typeof blogPostSchema>
export type Work = z.infer<typeof workSchema>

export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

export interface NavItem {
  title: string
  href: string
  disabled?: boolean
} 