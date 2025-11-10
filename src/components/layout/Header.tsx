"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Code, Palette } from 'lucide-react'
import { useUIStore } from '@/stores/ui-store'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#experience', label: 'Experience' },
  { href: '/writings', label: 'Writings' },
  { href: '/#contact', label: 'Contact' },
]

export function Header() {
  const pathname = usePathname()
  const { designMode, setDesignMode } = useUIStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDesignMode = () => {
    setDesignMode(designMode === 'design' ? 'code' : 'design')
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-border backdrop-blur-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-display font-bold neon-glow">David Ojo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => {
              const isHashLink = item.href.startsWith('/#')
              const isActive = pathname === item.href || (pathname === '/' && isHashLink)
              const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                if (isHashLink) {
                  e.preventDefault()
                  const hash = item.href.split('#')[1]
                  const element = document.getElementById(hash)
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleClick}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-neon-cyan neon-glow-low'
                      : 'text-gray-300 hover:text-neon-cyan'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Mode Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <IconButton
              variant="ghost"
              onClick={toggleDesignMode}
              aria-label={`Switch to ${designMode === 'design' ? 'code' : 'design'} mode`}
              className="hidden md:flex"
            >
              {designMode === 'design' ? (
                <Code className="h-5 w-5" />
              ) : (
                <Palette className="h-5 w-5" />
              )}
            </IconButton>

            <IconButton
              variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </IconButton>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-border border-t"
          >
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => {
                const isHashLink = item.href.startsWith('/#')
                const isActive = pathname === item.href || (pathname === '/' && isHashLink)
                const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                  setMobileMenuOpen(false)
                  if (isHashLink) {
                    e.preventDefault()
                    const hash = item.href.split('#')[1]
                    setTimeout(() => {
                      const element = document.getElementById(hash)
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }
                    }, 100)
                  }
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleClick}
                    className={`block text-base font-medium transition-colors ${
                      isActive
                        ? 'text-neon-cyan neon-glow-low'
                        : 'text-gray-300 hover:text-neon-cyan'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <IconButton
                variant="ghost"
                onClick={toggleDesignMode}
                aria-label={`Switch to ${designMode === 'design' ? 'code' : 'design'} mode`}
                className="mt-4"
              >
                {designMode === 'design' ? (
                  <>
                    <Code className="h-5 w-5 mr-2" />
                    Switch to Code Mode
                  </>
                ) : (
                  <>
                    <Palette className="h-5 w-5 mr-2" />
                    Switch to Design Mode
                  </>
                )}
              </IconButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}






