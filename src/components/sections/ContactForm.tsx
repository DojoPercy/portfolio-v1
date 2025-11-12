"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { motion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      // TODO: Implement form submission
      console.log('Form data:', data)
      setSubmitted(true)
      reset()
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <Card className="py-12">
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-display font-semibold mb-2">Thank you!</h2>
          <p className="text-gray-400">Your message has been sent. I'll get back to you soon.</p>
        </Card>
      </motion.div>
    )
  }

  return (
    <Card elevation={2}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Your name"
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="your.email@example.com"
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            Subject
          </label>
          <Input
            id="subject"
            {...register('subject')}
            placeholder="What's this about?"
            className={errors.subject ? 'border-red-500' : ''}
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            {...register('message')}
            rows={6}
            placeholder="Tell me about your project..."
            className={`flex w-full rounded-lg border ${
              errors.message ? 'border-red-500' : 'border-gray-700'
            } bg-dark-surface px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/20 focus:ring-offset-2 focus:ring-offset-dark-bg transition-colors resize-none`}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
          )}
        </div>

        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            'Sending...'
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </Card>
  )
}










