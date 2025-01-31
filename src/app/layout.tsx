// import { Inter } from 'next/font/google'
import { TamaguiProvider } from '@/components/providers/TamaguiProvider'
import { MainLayout } from '@/components/layout/MainLayout'
import '@/styles/globals.css'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Portfolio Website',
  description: 'A modern portfolio website built with Next.js and Tamagui',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <TamaguiProvider>
          <MainLayout>{children}</MainLayout>
        </TamaguiProvider>
      </body>
    </html>
  )
}
