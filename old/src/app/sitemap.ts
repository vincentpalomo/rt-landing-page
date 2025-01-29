import { createClient } from '@/lib/supabase'
import { absoluteUrl } from '@/lib/utils'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient()

  // Get all published blog posts
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, created_at')
    .eq('published', true)

  // Get all works
  const { data: works } = await supabase
    .from('works')
    .select('created_at')

  const routes = ['', '/about', '/blog', '/works'].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date().toISOString(),
  }))

  const blogRoutes = (posts ?? []).map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.created_at,
  }))

  return [...routes, ...blogRoutes]
} 