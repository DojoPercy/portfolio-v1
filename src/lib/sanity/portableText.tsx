import { PortableText as PortableTextComponent, type PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from './image'

interface PortableTextProps {
  value: any[]
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(800).height(600).url()}
            alt={value.alt || ' '}
            width={800}
            height={600}
            className="rounded-lg"
          />
          {value.caption && (
            <p className="mt-2 text-sm text-gray-400 text-center">
              {value.caption}
            </p>
          )}
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || ''
      const target = href.startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-neon-cyan hover:underline"
        >
          {children}
        </a>
      )
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-display font-bold mb-4 mt-8">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-display font-bold mb-3 mt-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-display font-semibold mb-2 mt-4">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-7">{children}</p>
    ),
  },
}

export function PortableText({ value }: PortableTextProps) {
  return <PortableTextComponent value={value} components={components} />
}

