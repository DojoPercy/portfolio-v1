"use client"

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { 
  Code, 
  Palette, 
  Database, 
  Smartphone, 
  Cloud, 
  Zap, 
  Users, 
  Target,
  CheckCircle2,
  ArrowRight
} from 'lucide-react'
import { ScrollAnimation } from '@/components/effects/ScrollAnimations'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function HireMeSection() {
  const capabilities = [
    {
      icon: Code,
      title: 'Full-Stack Development',
      description: 'Building end-to-end solutions with Next.js, NestJS, React, TypeScript, and Node.js. Creating scalable, maintainable code that powers modern web applications.',
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Developing cross-platform mobile applications with Flutter, delivering native-like performance and beautiful user experiences on iOS and Android.',
      iconColor: 'text-purple-400',
      bgColor: 'bg-purple-400/10'
    },
    {
      icon: Database,
      title: 'Backend & APIs',
      description: 'Designing robust RESTful and GraphQL APIs, implementing authentication systems, database optimization, and microservices architecture.',
      iconColor: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    {
      icon: Palette,
      title: 'Product Design',
      description: 'Crafting intuitive user interfaces and experiences. From wireframes to pixel-perfect designs, I bridge the gap between design and development.',
      iconColor: 'text-pink-400',
      bgColor: 'bg-pink-400/10'
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      description: 'Deploying applications on AWS, managing CI/CD pipelines, containerization with Docker, and ensuring scalable infrastructure.',
      iconColor: 'text-cyan-400',
      bgColor: 'bg-cyan-400/10'
    },
    {
      icon: Zap,
      title: 'AI Integration',
      description: 'Building AI-powered features with LangGraph, OpenAI APIs, and custom AI agents that enhance user experiences and automate workflows.',
      iconColor: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10'
    },
  ]

  const valuePropositions = [
    'Delivered production-ready SaaS platforms serving real businesses',
    'Led cross-functional teams to ship complex features on time',
    'Reduced development time by 30% through process optimization',
    'Built scalable systems handling thousands of concurrent users',
    'Integrated AI capabilities that enhanced user productivity',
    'Designed and developed complete product ecosystems from scratch',
  ]

  return (
    <section id="hire-me" className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark-bg via-dark-surface/50 to-dark-bg">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <ScrollAnimation direction="up">
          <div className="text-center mb-20 space-y-6">
            <motion.h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold neon-glow-low"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Why Hire Me?
            </motion.h2>
            <motion.p 
              className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              I'm not just a developer—I'm a problem solver who transforms ideas into 
              scalable, beautiful, and impactful digital products. Here's what I bring to your team.
            </motion.p>
          </div>
        </ScrollAnimation>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon
            return (
              <ScrollAnimation key={capability.title} direction="up" delay={index * 0.1}>
                <Card elevation={2} className="h-full hover:scale-[1.02] transition-transform duration-300 group">
                  <div className="space-y-4">
                    <div className={`p-4 ${capability.bgColor} rounded-lg w-fit group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-8 w-8 ${capability.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-display font-bold text-white">
                      {capability.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                </Card>
              </ScrollAnimation>
            )
          })}
        </div>

        {/* Value Propositions */}
        <ScrollAnimation direction="up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <Card elevation={2} className="p-8 lg:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-neon-cyan/10 rounded-lg">
                  <Target className="h-8 w-8 text-neon-cyan" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white">
                  Proven Track Record
                </h3>
              </div>
              <ul className="space-y-4">
                {valuePropositions.map((proposition, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-neon-cyan mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 leading-relaxed">{proposition}</span>
                  </motion.li>
                ))}
              </ul>
            </Card>

            <Card elevation={2} className="p-8 lg:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-neon-cyan/10 rounded-lg">
                  <Users className="h-8 w-8 text-neon-cyan" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white">
                  What I Bring
                </h3>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Technical Excellence</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Deep expertise across the full stack—from pixel-perfect frontends to 
                    robust backend systems. I write clean, maintainable code and follow 
                    industry best practices.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Product Mindset</h4>
                  <p className="text-gray-300 leading-relaxed">
                    I don't just code—I think about users, business goals, and long-term 
                    sustainability. Every feature I build serves a purpose and adds value.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Collaboration</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Strong communication skills and experience leading teams. I thrive in 
                    collaborative environments and help elevate the entire team.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Continuous Learning</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Technology evolves rapidly, and so do I. I stay current with the latest 
                    tools, frameworks, and methodologies to deliver cutting-edge solutions.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </ScrollAnimation>

        {/* CTA */}
        <ScrollAnimation direction="up">
          <div className="text-center space-y-6">
            <motion.p 
              className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to build something amazing together? Let's discuss how I can contribute to your team's success.
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="#contact">
                <Button size="lg" className="min-w-[200px]">
                  Get In Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#projects">
                <Button variant="secondary" size="lg" className="min-w-[200px]">
                  View My Work
                </Button>
              </Link>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}

