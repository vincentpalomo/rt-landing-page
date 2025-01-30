'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function HeroCTA() {
  const navigationButtons = [
    { 
      href: '/about', 
      label: 'Experience', 
      delay: 0.2,
      gradient: 'from-blue-600 to-blue-800',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      href: '/projects', 
      label: 'Portfolio', 
      delay: 0.3,
      gradient: 'from-blue-800 to-indigo-700',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      href: '/blog',
      label: 'Insights', 
      delay: 0.35,
      gradient: 'from-indigo-700 to-indigo-900',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      href: '/contact', 
      label: 'Connect', 
      delay: 0.4,
      gradient: 'from-indigo-900 to-blue-900',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
        </svg>
      )
    },
  ]

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-blue-900/5" />
        <div className="absolute top-20 left-0 w-72 h-72 bg-blue-900/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-72 h-72 bg-indigo-900/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-800/5 rounded-full blur-3xl" />
      </div>
      
      {/* Content container */}
      <div className="relative w-full max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-16">
        {/* Left container - Professional Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-72 h-72 md:w-[450px] md:h-[450px]"
        >
          {/* Animated background effects */}
          <div className="absolute inset-4 animate-spin-slow">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-900/10 to-indigo-900/10 blur-2xl" />
          </div>
          <div className="absolute inset-4 animate-reverse-spin">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-900/10 to-blue-800/10 blur-2xl" />
          </div>
          
          {/* Profile image */}
          <motion.div 
            className="relative z-10 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl
                       backdrop-blur-sm bg-gradient-to-br from-background/80 to-background/40"
            initial={{ rotate: -180 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Image
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMjAyMDIwIi8+CjxwYXRoIGQ9Ik0yMDAgMTIwQzIyMC45MSAxMjAgMjM4IDEzNy4wOSAyMzggMTU4QzIzOCAxNzguOTEgMjIwLjkxIDE5NiAyMDAgMTk2QzE3OS4wOSAxOTYgMTYyIDE3OC45MSAxNjIgMTU4QzE2MiAxMzcuMDkgMTc5LjA5IDEyMCAyMDAgMTIwWiIgZmlsbD0iIzQwNDA0MCIvPgo8cGF0aCBkPSJNMTk2IDIwMEgyMDRDMjUzLjcgMjAwIDI5NCAyNDAuMyAyOTQgMjkwVjMxMEgxMDZWMjkwQzEwNiAyNDAuMyAxNDYuMyAyMDAgMTk2IDIwMFoiIGZpbGw9IiM0MDQwNDAiLz4KPC9zdmc+Cg=="
              alt="Professional headshot"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Right container - Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center md:items-start gap-10"
        >
          {/* Intro text */}
          <div className="text-center md:text-left space-y-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block text-sm md:text-base text-foreground/60 font-medium tracking-wider uppercase"
            >
              Strategic Technology Leadership
            </motion.span>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-600 to-indigo-900 text-transparent bg-clip-text">
                Robert Johnson
              </span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-foreground/70 max-w-lg font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Technology Executive & Digital Transformation Specialist with 15+ years of experience driving innovation and business growth
            </motion.p>
          </div>

          {/* Navigation buttons */}
          <motion.div 
            className="flex flex-wrap justify-center md:justify-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {navigationButtons.map((button) => (
              <Link
                key={button.href}
                href={button.href}
                className="group relative block"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-lg bg-gradient-to-br ${button.gradient}
                             flex items-center gap-2
                             shadow-lg shadow-foreground/5
                             transition-all duration-300
                             hover:shadow-xl hover:shadow-foreground/10
                             relative z-10`}
                >
                  <span className="text-white/90">
                    {button.icon}
                  </span>
                  <span className="text-white/90 text-sm font-medium">
                    {button.label}
                  </span>
                </motion.div>
                <div 
                  className={`absolute -inset-1 rounded-lg bg-gradient-to-r ${button.gradient} 
                             opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300 -z-10`}
                />
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 
