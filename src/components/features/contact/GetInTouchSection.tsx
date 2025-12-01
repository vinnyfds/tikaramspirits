'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'
import { submitInquiry } from '@/lib/inquiries'
import { useToast } from '@/hooks/useToast'

export function GetInTouchSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await submitInquiry({
        name: formData.name,
        email: formData.email,
        inquiryType: formData.inquiryType,
        message: formData.message,
      })

      if (result.success) {
        showToast('Message sent! We will contact you soon.', 'success')
        setFormData({
          name: '',
          email: '',
          inquiryType: '',
          message: '',
        })
      } else {
        showToast(result.error || 'Failed to send message. Please try again.', 'error')
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error)
      showToast('An unexpected error occurred. Please try again later.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const heroImageUrl = 'https://tikaram-spirits-assets-prod.s3.us-east-1.amazonaws.com/assets/global/hero-get-in-touch.jpg'

  return (
    <section className="py-16 lg:py-32 px-4 md:px-8 lg:px-12 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {/* Left Column - Form */}
          <div className="flex flex-col gap-6 h-full">
            <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] font-semibold text-[#36454F]">
              Get in Touch
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-sans text-sm uppercase tracking-widest font-semibold text-[#36454F]">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-soft bg-white border border-neutral-200 text-[#36454F] placeholder:text-[#36454F]/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all font-sans text-base"
                  placeholder="Your name"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-sans text-sm uppercase tracking-widest font-semibold text-[#36454F]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-soft bg-white border border-neutral-200 text-[#36454F] placeholder:text-[#36454F]/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all font-sans text-base"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              {/* Inquiry Type Dropdown */}
              <div className="flex flex-col gap-2">
                <label htmlFor="inquiryType" className="font-sans text-sm uppercase tracking-widest font-semibold text-[#36454F]">
                  Inquiry Type
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-soft bg-white border border-neutral-200 text-[#36454F] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all font-sans text-base"
                  required
                >
                  <option value="">Select an inquiry type</option>
                  <option value="General">General</option>
                  <option value="Wholesale">Wholesale</option>
                  <option value="Events">Events</option>
                  <option value="Press">Press</option>
                </select>
              </div>

              {/* Message Textarea */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-sans text-sm uppercase tracking-widest font-semibold text-[#36454F]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 rounded-soft bg-white border border-neutral-200 text-[#36454F] placeholder:text-[#36454F]/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all font-sans text-base resize-y"
                  placeholder="Tell us how we can help..."
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="font-sans text-sm uppercase tracking-widest font-semibold px-6 py-3 rounded-soft bg-[#D4AF37] text-[#004225] hover:bg-[#B8941F] hover:translate-y-[-2px] hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.12)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            {/* Contact Details */}
            <div className="mt-8 pt-8 border-t border-neutral-200">
              <h3 className="font-serif text-xl lg:text-2xl font-semibold text-[#36454F] mb-6">
                Contact Details
              </h3>
              <div className="flex flex-col gap-4">
                {/* Distillery Name */}
                <div className="mb-2">
                  <p className="font-serif text-lg font-semibold text-[#36454F]">
                    Fatdogspirits
                  </p>
                </div>
                
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <address className="font-sans text-base text-[#36454F]/80 leading-relaxed not-italic">
                    3212 N 40th St #701<br />
                    Tampa, FL 33605<br />
                    United States
                  </address>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                  <a
                    href="tel:+13055550123"
                    className="font-sans text-base text-[#36454F]/80 hover:text-[#D4AF37] transition-colors"
                  >
                    (305) 555-0123
                  </a>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                  <a
                    href="mailto:info@tikaramspirits.com"
                    className="font-sans text-base text-[#36454F]/80 hover:text-[#D4AF37] transition-colors"
                  >
                    info@tikaramspirits.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative w-full self-stretch rounded-[2.5rem] overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-[#004225]">
              <Image
                src={heroImageUrl}
                alt="Get in Touch with Tikaram Spirits"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

