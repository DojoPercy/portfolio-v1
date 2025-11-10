"use client"

import { useEffect } from 'react'

/**
 * Enhanced micro-interactions for buttons, links, and interactive elements
 * Adds hover effects, animations, and visual feedback
 */
export function MicroInteractions() {
  useEffect(() => {
    // Add magnetic effect to buttons with data-magnetic attribute
    const magneticElements = document.querySelectorAll('[data-magnetic]')
    
    magneticElements.forEach((element) => {
      const el = element as HTMLElement
      
      const handleMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        
        const moveX = x * 0.15
        const moveY = y * 0.15
        
        el.style.transform = `translate(${moveX}px, ${moveY}px)`
      }
      
      const handleMouseLeave = () => {
        el.style.transform = 'translate(0, 0)'
      }
      
      el.addEventListener('mousemove', handleMouseMove)
      el.addEventListener('mouseleave', handleMouseLeave)
      
      return () => {
        el.removeEventListener('mousemove', handleMouseMove)
        el.removeEventListener('mouseleave', handleMouseLeave)
      }
    })

    // Add ripple effect to buttons on click
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const button = target.closest('button, [data-ripple]')
      
      if (button) {
        const ripple = document.createElement('span')
        const rect = button.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: rgba(0, 240, 255, 0.4);
          left: ${x}px;
          top: ${y}px;
          pointer-events: none;
          transform: scale(0);
          animation: ripple 0.6s ease-out;
        `
        
        // Add ripple animation
        const style = document.createElement('style')
        style.textContent = `
          @keyframes ripple {
            to {
              transform: scale(4);
              opacity: 0;
            }
          }
        `
        if (!document.head.querySelector('#ripple-style')) {
          style.id = 'ripple-style'
          document.head.appendChild(style)
        }
        
        // Make button relative if not already
        const buttonElement = button as HTMLElement
        if (getComputedStyle(buttonElement).position === 'static') {
          buttonElement.style.position = 'relative'
        }
        buttonElement.style.overflow = 'hidden'
        
        buttonElement.appendChild(ripple)
        
        setTimeout(() => {
          ripple.remove()
        }, 600)
      }
    }
    
    document.addEventListener('click', handleClick, true)
    
    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [])

  return null
}

