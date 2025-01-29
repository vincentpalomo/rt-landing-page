import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import type { Work } from '@/types'

interface WorkCardProps {
  work: Work
}

export function WorkCard({ work }: WorkCardProps) {
  return (
    <article className="group relative flex flex-col space-y-2">
      {work.image_url && (
        <div className="relative aspect-video overflow-hidden rounded-md">
          <Image
            src={work.image_url}
            alt={work.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 384px, (min-width: 768px) 288px, 100vw"
          />
        </div>
      )}
      <div className="flex flex-col space-y-1">
        <h2 className="text-2xl font-bold transition-colors group-hover:text-primary">
          {work.title}
        </h2>
        <p className="text-muted-foreground line-clamp-2">{work.description}</p>
        {work.tags && work.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {work.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <p className="text-sm text-muted-foreground">
          {formatDate(work.created_at)}
        </p>
      </div>
      {work.link && (
        <a
          href={work.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0"
        >
          <span className="sr-only">View Project</span>
        </a>
      )}
    </article>
  )
} 