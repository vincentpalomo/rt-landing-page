'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { PasswordProtection } from '@/components/auth/PasswordProtection'

const projects = [
  {
    title: 'Enterprise Digital Transformation',
    description: 'Led a comprehensive digital transformation initiative for a Fortune 500 retail company, implementing cloud infrastructure and modernizing legacy systems.',
    impact: 'Reduced operational costs by 40% and improved system reliability by 99.9%',
    tech: ['Cloud Architecture', 'AI/ML', 'Enterprise Integration', 'Data Analytics'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600',
    link: '#',
  },
  {
    title: 'Global Supply Chain Optimization',
    description: 'Developed and implemented an AI-driven supply chain optimization platform for a multinational manufacturing corporation.',
    impact: 'Increased supply chain efficiency by 35% and reduced logistics costs by 25%',
    tech: ['Predictive Analytics', 'Blockchain', 'IoT Integration', 'Machine Learning'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600',
    link: '#',
  },
  {
    title: 'Financial Services Modernization',
    description: 'Spearheaded the modernization of core banking systems for a leading financial institution, implementing real-time processing and enhanced security measures.',
    impact: 'Achieved 99.99% uptime and 50% faster transaction processing',
    tech: ['Microservices', 'Security', 'Real-time Processing', 'Cloud Native'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600',
    link: '#',
  },
  {
    title: 'Healthcare Analytics Platform',
    description: 'Designed and implemented a comprehensive healthcare analytics platform enabling real-time patient data analysis and predictive care recommendations.',
    impact: 'Improved patient outcomes by 45% and reduced administrative costs by 30%',
    tech: ['Big Data', 'HIPAA Compliance', 'AI Analytics', 'Cloud Security'],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600',
    link: '#',
  },
  {
    title: 'Smart City Infrastructure',
    description: 'Led the development of an integrated smart city platform managing transportation, energy, and public services for a metropolitan area.',
    impact: 'Reduced energy consumption by 25% and improved public service efficiency by 40%',
    tech: ['IoT Platform', 'Real-time Analytics', 'Smart Grid', 'Urban Tech'],
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600',
    link: '#',
  },
  {
    title: 'Enterprise Security Framework',
    description: 'Developed and implemented a comprehensive cybersecurity framework for a global financial services organization.',
    impact: 'Enhanced security posture and achieved zero critical incidents over 24 months',
    tech: ['Zero Trust', 'Threat Intelligence', 'Identity Management', 'Compliance'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600',
    link: '#',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function ProjectsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (!isAuthenticated) {
    return <PasswordProtection onSuccess={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Header Section */}
      <div className="relative h-[30vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-background to-indigo-900/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(30,64,175,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,58,138,0.15),transparent_50%)]" />
        </div>
        <div className="relative text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-900 inline-block text-transparent bg-clip-text">
            Strategic Initiatives
          </h1>
          <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto">
            Transformative enterprise solutions driving business growth and innovation
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-background/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg
                         border border-white/5 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 2).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-blue-900/20 text-blue-100 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 2 && (
                        <span className="px-2 py-1 bg-blue-900/20 text-blue-100 rounded-full text-xs font-medium">
                          +{project.tech.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <p className="text-sm text-foreground/90 font-medium">
                      {project.impact}
                    </p>
                  </div>
                  <div className="pt-4 flex justify-between items-center border-t border-white/5">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(2).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-blue-900/10 text-foreground/60 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.link}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      View Details →
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 