'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: '',
    message: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('Thank you for contacting Tikaram!')
    setFormData({
      name: '',
      email: '',
      inquiryType: '',
      message: '',
    })
  }

  return (
    <main className="bg-[#F8F8F8]">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-[#004225]">
            <Image
              src="/assets/about/distillery-aerial.jpg"
              alt="Aerial view of Tikaram Distillery"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 text-center">
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-[#FFFFFF] leading-tight">
            Experience Tikaram.
          </h1>
        </div>
      </section>

      {/* Info Grid Section */}
      <section className="py-16 lg:py-32 px-4 md:px-8 lg:px-12 bg-[#F8F8F8]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Tours Column */}
            <div className="flex flex-col gap-4">
              <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-[#36454F]">
                Tours
              </h3>
              <p className="font-sans text-base lg:text-lg text-[#36454F]/80 leading-relaxed">
                Guided tastings daily at 2pm & 5pm.
              </p>
            </div>

            {/* Location Column */}
            <div className="flex flex-col gap-4">
              <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-[#36454F]">
                Location
              </h3>
              <address className="font-sans text-base lg:text-lg text-[#36454F]/80 leading-relaxed not-italic">
                123 Distillery Way<br />
                Miami, FL 33101<br />
                United States
              </address>
            </div>

            {/* Hours Column */}
            <div className="flex flex-col gap-4">
              <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-[#36454F]">
                Hours
              </h3>
              <p className="font-sans text-base lg:text-lg text-[#36454F]/80 leading-relaxed">
                Mon-Sat: 12pm - 10pm
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section (Split Layout) */}
      <section className="py-16 lg:py-32 px-4 md:px-8 lg:px-12 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - Form */}
            <div className="flex flex-col gap-6">
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
                  className="font-sans text-sm uppercase tracking-widest font-semibold px-6 py-3 rounded-soft bg-[#D4AF37] text-[#004225] hover:bg-[#B8941F] hover:translate-y-[-2px] hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.12)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Right Column - Bar Image */}
            <div className="relative w-full aspect-[4/5] lg:aspect-[3/4]">
              <div className="absolute inset-0 bg-[#004225]">
                <Image
                  src="/assets/about/distillery-bar.jpg"
                  alt="Tikaram Distillery tasting bar"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-16 lg:py-32 px-4 md:px-8 lg:px-12 bg-[#F8F8F8]">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] font-semibold text-[#36454F] mb-12 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="flex flex-col gap-4">
            {/* FAQ Item 1 */}
            <details className="group border border-neutral-200 rounded-soft overflow-hidden bg-white transition-all duration-300">
              <summary className="cursor-pointer list-none p-6 flex items-center justify-between hover:bg-[#F8F8F8] transition-colors duration-200">
                <h4 className="font-serif text-lg lg:text-2xl font-semibold text-[#36454F] pr-4">
                  Do I need a reservation?
                </h4>
                <svg
                  className="w-5 h-5 text-[#36454F] transition-transform duration-300 flex-shrink-0 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 pt-0">
                <p className="font-sans text-base lg:text-lg text-[#36454F]/80 leading-relaxed">
                  Reservations are recommended for tours, especially on weekends. Walk-ins are welcome based on availability. 
                  For guaranteed spots, please book your tour in advance.
                </p>
              </div>
            </details>

            {/* FAQ Item 2 */}
            <details className="group border border-neutral-200 rounded-soft overflow-hidden bg-white transition-all duration-300">
              <summary className="cursor-pointer list-none p-6 flex items-center justify-between hover:bg-[#F8F8F8] transition-colors duration-200">
                <h4 className="font-serif text-lg lg:text-2xl font-semibold text-[#36454F] pr-4">
                  Are kids allowed?
                </h4>
                <svg
                  className="w-5 h-5 text-[#36454F] transition-transform duration-300 flex-shrink-0 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 pt-0">
                <p className="font-sans text-base lg:text-lg text-[#36454F]/80 leading-relaxed">
                  Children are welcome in our distillery during regular hours. However, they must be accompanied by an adult 
                  at all times. Please note that tastings are restricted to guests 21 years and older.
                </p>
              </div>
            </details>

            {/* FAQ Item 3 */}
            <details className="group border border-neutral-200 rounded-soft overflow-hidden bg-white transition-all duration-300">
              <summary className="cursor-pointer list-none p-6 flex items-center justify-between hover:bg-[#F8F8F8] transition-colors duration-200">
                <h4 className="font-serif text-lg lg:text-2xl font-semibold text-[#36454F] pr-4">
                  Private events?
                </h4>
                <svg
                  className="w-5 h-5 text-[#36454F] transition-transform duration-300 flex-shrink-0 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 pt-0">
                <p className="font-sans text-base lg:text-lg text-[#36454F]/80 leading-relaxed">
                  Yes! We host private events, corporate gatherings, and special celebrations. Our space can accommodate 
                  groups of various sizes. Please contact us through the form above or call us directly to discuss your event needs.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
    </main>
  )
}
