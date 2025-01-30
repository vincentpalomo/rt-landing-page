'use client'

import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
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

const expertise = [
  { 
    category: 'Strategic Leadership', 
    items: [
      'Digital Transformation',
      'Innovation Strategy',
      'Enterprise Architecture',
      'Technology Vision'
    ] 
  },
  { 
    category: 'Technical Excellence', 
    items: [
      'Cloud Architecture',
      'System Integration',
      'Data Analytics',
      'Security & Compliance'
    ] 
  },
  { 
    category: 'Business Acumen', 
    items: [
      'Stakeholder Management',
      'Budget Optimization',
      'Risk Management',
      'Team Leadership'
    ] 
  },
]

const experiences = [
  {
    title: 'Chief Technology Officer',
    company: 'Global Solutions Inc.',
    period: '2019 - Present',
    description: 'Leading digital transformation initiatives and overseeing technology strategy for a Fortune 500 company. Driving innovation across cloud infrastructure, AI implementation, and enterprise architecture.',
  },
  {
    title: 'VP of Technology',
    company: 'Innovation Tech',
    period: '2015 - 2019',
    description: 'Spearheaded the development of enterprise solutions and led a team of 100+ technology professionals. Implemented agile methodologies and modernized legacy systems.',
  },
  {
    title: 'Director of Engineering',
    company: 'TechCorp International',
    period: '2012 - 2015',
    description: 'Managed large-scale digital transformation projects and established technical standards for the organization. Reduced operational costs by 30% through strategic technology initiatives.',
  },
]

export default function AboutPage() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-b from-background to-background/95"
    >
      {/* Header Section */}
      <motion.div 
        variants={itemVariants}
        className="relative h-[30vh] overflow-hidden flex items-center justify-center"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-background to-indigo-900/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(30,64,175,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,58,138,0.15),transparent_50%)]" />
        </div>
        <div className="relative text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-900 inline-block text-transparent bg-clip-text">
            Professional Experience
          </h1>
          <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto px-4">
            Driving digital transformation and innovation in enterprise technology
          </p>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Executive Summary Section */}
        <motion.section className="mb-20" variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-8 text-foreground/90">Executive Summary</h2>
          <div className="bg-background/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/5">
            <p className="text-lg text-foreground/80 leading-relaxed">
              As a seasoned Technology Executive with over 15 years of experience, I specialize in driving digital transformation 
              and innovation across enterprise organizations. My expertise spans strategic technology leadership, enterprise architecture, 
              and delivering high-impact solutions that align with business objectives. Throughout my career, I have successfully led 
              multiple Fortune 500 companies through their digital evolution, consistently delivering measurable results and sustainable growth.
            </p>
          </div>
        </motion.section>

        {/* Areas of Expertise */}
        <motion.section className="mb-20" variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-8 text-foreground/90">Areas of Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {expertise.map((group) => (
              <motion.div
                key={group.category}
                className="bg-background/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/5"
                variants={itemVariants}
              >
                <h3 className="text-xl font-semibold mb-6 text-foreground/90">
                  {group.category}
                </h3>
                <div className="space-y-3">
                  {group.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-foreground/70"
                    >
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Professional Experience */}
        <motion.section variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-8 text-foreground/90">Professional Experience</h2>
          <div className="space-y-6">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                className="bg-background/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/5"
                variants={itemVariants}
              >
                <div className="flex flex-wrap justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground/90 mb-2">
                      {experience.title}
                    </h3>
                    <div className="text-blue-600 font-medium mb-2">{experience.company}</div>
                  </div>
                  <span className="text-sm text-foreground/60 font-medium bg-blue-900/10 px-3 py-1 rounded-full">
                    {experience.period}
                  </span>
                </div>
                <p className="text-foreground/70 leading-relaxed">{experience.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  )
} 