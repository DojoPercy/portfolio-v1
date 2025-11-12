"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Code, Palette } from 'lucide-react'
import { useUIStore } from '@/stores/ui-store'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const navItems = [
  { href: '/', label: 'Home', type: 'page' },
  { href: '/#about', label: 'About', type: 'hash' },
  { href: '/#hire-me', label: 'Why Hire Me', type: 'hash' },
  { href: '/projects', label: 'Projects', type: 'page' },
  { href: '/#skills', label: 'Skills', type: 'hash' },
  { href: '/#experience', label: 'Experience', type: 'hash' },
  { href: '/writings', label: 'Writings', type: 'page' },
  { href: '/contact', label: 'Contact', type: 'page' },
]

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { designMode, setDesignMode } = useUIStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentHash, setCurrentHash] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    
    // Track hash changes
    const handleHashChange = () => {
      setCurrentHash(window.location.hash)
    }
    handleHashChange() // Initial hash
    window.addEventListener('hashchange', handleHashChange)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('hashchange', handleHashChange)
    }
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
           <Image src="/logo.png" alt="David Ojo" width={40} height={40} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => {
              const isHashLink = item.type === 'hash'
              const isPageLink = item.type === 'page'
              
              // Determine if link is active
              const isActive = isPageLink 
                ? pathname === item.href
                : pathname === '/' && currentHash === item.href
              
              const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                if (isHashLink) {
                  e.preventDefault()
                  const hash = item.href.split('#')[1]
                  
                  // If we're on home page, just scroll
                  if (pathname === '/') {
                    const element = document.getElementById(hash)
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  } else {
                    // If we're on another page, navigate to home then scroll
                    router.push(item.href)
                    // Scroll after navigation completes
                    setTimeout(() => {
                      const element = document.getElementById(hash)
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }
                    }, 100)
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
                const isHashLink = item.type === 'hash'
                const isPageLink = item.type === 'page'
                
                // Determine if link is active
                const isActive = isPageLink 
                  ? pathname === item.href
                  : pathname === '/' && currentHash === item.href
                
                const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                  setMobileMenuOpen(false)
                  if (isHashLink) {
                    e.preventDefault()
                    const hash = item.href.split('#')[1]
                    
                    // If we're on home page, just scroll
                    if (pathname === '/') {
                      setTimeout(() => {
                        const element = document.getElementById(hash)
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }
                      }, 100)
                    } else {
                      // If we're on another page, navigate to home then scroll
                      router.push(item.href)
                      // Scroll after navigation completes
                      setTimeout(() => {
                        const element = document.getElementById(hash)
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }
                      }, 100)
                    }
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






