'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'
import { clsx } from 'clsx'

const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

type SignUpFormData = z.infer<typeof signUpSchema>
type SignInFormData = z.infer<typeof signInSchema>

type AuthModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [view, setView] = useState<'signup' | 'signin'>('signin')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const router = useRouter()
  const supabase = createClient()

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  })

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  })

  const onSignUp = async (data: SignUpFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      })

      if (error) {
        setSubmitStatus('error')
        setErrorMessage(error.message)
        return
      }

      setSubmitStatus('success')
      // Redirect after a brief delay to show success message
      setTimeout(() => {
        router.push('/')
        onClose()
      }, 2000)
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const onSignIn = async (data: SignInFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) {
        setSubmitStatus('error')
        setErrorMessage(error.message)
        return
      }

      // Success - close modal and redirect
      router.push('/')
      onClose()
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleViewSwitch = (newView: 'signup' | 'signin') => {
    setView(newView)
    setSubmitStatus('idle')
    setErrorMessage('')
    signUpForm.reset()
    signInForm.reset()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={view === 'signup' ? 'Sign Up' : 'Sign In'}>
      <div className="flex flex-col gap-6">
        {/* View Toggle */}
        <div className="flex gap-2 border-b border-neutral-200 pb-4">
          <button
            onClick={() => handleViewSwitch('signin')}
            className={clsx(
              'flex-1 py-2 font-sans text-sm uppercase tracking-widest font-semibold transition-colors',
              view === 'signin'
                ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                : 'text-[#36454F]/60 hover:text-[#36454F]'
            )}
          >
            Sign In
          </button>
          <button
            onClick={() => handleViewSwitch('signup')}
            className={clsx(
              'flex-1 py-2 font-sans text-sm uppercase tracking-widest font-semibold transition-colors',
              view === 'signup'
                ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                : 'text-[#36454F]/60 hover:text-[#36454F]'
            )}
          >
            Sign Up
          </button>
        </div>

        {/* Sign Up Form */}
        {view === 'signup' && (
          <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="signup-email" className="font-sans text-sm uppercase tracking-widest font-semibold text-[#36454F]">
                Email
              </label>
              <input
                id="signup-email"
                type="email"
                {...signUpForm.register('email')}
                className={clsx(
                  'w-full px-4 py-3 rounded bg-white border border-neutral-200 text-[#36454F] placeholder:text-[#36454F]/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all font-sans text-base',
                  signUpForm.formState.errors.email && 'border-[#B7410E]'
                )}
                placeholder="your.email@example.com"
                aria-invalid={signUpForm.formState.errors.email ? 'true' : 'false'}
              />
              {signUpForm.formState.errors.email && (
                <p className="text-sm text-[#B7410E]">{signUpForm.formState.errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="signup-password" className="font-sans text-sm uppercase tracking-widest font-semibold text-[#36454F]">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                {...signUpForm.register('password')}
                className={clsx(
                  'w-full px-4 py-3 rounded bg-white border border-neutral-200 text-[#36454F] placeholder:text-[#36454F]/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all font-sans text-base',
                  signUpForm.formState.errors.password && 'border-[#B7410E]'
                )}
                placeholder="At least 8 characters"
                aria-invalid={signUpForm.formState.errors.password ? 'true' : 'false'}
              />
              {signUpForm.formState.errors.password && (
                <p className="text-sm text-[#B7410E]">{signUpForm.formState.errors.password.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="signup-confirm-password" className="font-sans text-sm uppercase tracking-widest font-semibold text-[#36454F]">
                Confirm Password
              </label>
              <input
                id="signup-confirm-password"
                type="password"
                {...signUpForm.register('confirmPassword')}
                className={clsx(
                  'w-full px-4 py-3 rounded bg-white border border-neutral-200 text-[#36454F] placeholder:text-[#36454F]/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all font-sans text-base',
                  signUpForm.formState.errors.confirmPassword && 'border-[#B7410E]'
                )}
                placeholder="Confirm your password"
                aria-invalid={signUpForm.formState.errors.confirmPassword ? 'true' : 'false'}
              />
              {signUpForm.formState.errors.confirmPassword && (
                <p className="text-sm text-[#B7410E]">{signUpForm.formState.errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </Button>

            {submitStatus === 'success' && (
              <p className="text-sm text-[#004225] font-sans">
                Please check your email to verify your account. Redirecting...
              </p>
            )}
            {submitStatus === 'error' && errorMessage && (
              <p className="text-sm text-[#B7410E] font-sans">{errorMessage}</p>
            )}
          </form>
        )}

        {/* Sign In Form */}
        {view === 'signin' && (
          <form onSubmit={signInForm.handleSubmit(onSignIn)} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="signin-email" className="font-sans text-sm uppercase tracking-widest font-semibold text-[#36454F]">
                Email
              </label>
              <input
                id="signin-email"
                type="email"
                {...signInForm.register('email')}
                className={clsx(
                  'w-full px-4 py-3 rounded bg-white border border-neutral-200 text-[#36454F] placeholder:text-[#36454F]/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all font-sans text-base',
                  signInForm.formState.errors.email && 'border-[#B7410E]'
                )}
                placeholder="your.email@example.com"
                aria-invalid={signInForm.formState.errors.email ? 'true' : 'false'}
              />
              {signInForm.formState.errors.email && (
                <p className="text-sm text-[#B7410E]">{signInForm.formState.errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="signin-password" className="font-sans text-sm uppercase tracking-widest font-semibold text-[#36454F]">
                Password
              </label>
              <input
                id="signin-password"
                type="password"
                {...signInForm.register('password')}
                className={clsx(
                  'w-full px-4 py-3 rounded bg-white border border-neutral-200 text-[#36454F] placeholder:text-[#36454F]/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all font-sans text-base',
                  signInForm.formState.errors.password && 'border-[#B7410E]'
                )}
                placeholder="Enter your password"
                aria-invalid={signInForm.formState.errors.password ? 'true' : 'false'}
              />
              {signInForm.formState.errors.password && (
                <p className="text-sm text-[#B7410E]">{signInForm.formState.errors.password.message}</p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>

            {submitStatus === 'error' && errorMessage && (
              <p className="text-sm text-[#B7410E] font-sans">{errorMessage}</p>
            )}
          </form>
        )}
      </div>
    </Modal>
  )
}

