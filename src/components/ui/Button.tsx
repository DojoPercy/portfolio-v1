"use client"

import { ButtonHTMLAttributes, forwardRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-dark-bg disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group",
  {
    variants: {
      variant: {
        primary: "bg-neon-cyan text-dark-bg hover:bg-neon-cyan/90 hover:shadow-neon-md active:scale-95 hover:scale-105",
        secondary: "border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 hover:shadow-neon-sm active:scale-95 hover:scale-105 hover:border-neon-cyan/80",
        ghost: "text-white hover:text-neon-cyan hover:bg-white/5 active:scale-95 hover:scale-105",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  href?: string
  target?: string
  rel?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, href, target, rel, children, ...props }, ref) => {
    if (asChild && href) {
      // Check if it's an external link
      const isExternal = href.startsWith('http') || href.startsWith('//')
      
      if (isExternal) {
        return (
          <a
            href={href}
            target={target || '_blank'}
            rel={rel || 'noopener noreferrer'}
            className={cn(buttonVariants({ variant, size, className }))}
          >
            {children}
          </a>
        )
      }
      
      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size, className }))}
        >
          {children}
        </Link>
      )
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

