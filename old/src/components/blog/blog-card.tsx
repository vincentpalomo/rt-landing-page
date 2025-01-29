import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/types'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group relative flex flex-col space-y-2">
      {post.cover_image && (
        <div className="relative aspect-video overflow-hidden rounded-md">
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 384px, (min-width: 768px) 288px, 100vw"
          />
        </div>
      )}
      <div className="flex flex-col space-y-1">
        <h2 className="text-2xl font-bold transition-colors group-hover:text-primary">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
        )}
        <p className="text-sm text-muted-foreground">
          {formatDate(post.created_at)}
        </p>
      </div>
      <Link href={`/blog/${post.slug}`} className="absolute inset-0">
        <span className="sr-only">View Article</span>
      </Link>
    </article>
  )
} 