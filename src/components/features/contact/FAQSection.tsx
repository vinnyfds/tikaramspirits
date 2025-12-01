'use client'

export function FAQSection() {
  const faqs = [
    {
      question: 'Where are your spirits distilled?',
      answer: 'Our spirits are distilled in Tampa, Florida, at the Fat Dog Spirits facility.',
    },
    {
      question: 'Where can I buy Tikaram Spirits?',
      answer: "You can use the 'Find Your Bottle' map above or check our online store for availability and direct shipping options where permitted by law.",
    },
    {
      question: 'Do you offer distillery tours or tastings?',
      answer: 'Yes, we offer tours and private tastings at our Tampa location. Please check our Events page for the latest schedule.',
    },
    {
      question: 'What is the Paan Liqueur made from?',
      answer: 'It is crafted from rum and infused with a proprietary blend of aromatic spices and botanicals inspired by South Asian traditions.',
    },
    {
      question: 'Do I need a reservation for tours?',
      answer: 'Reservations are recommended for tours, especially on weekends. Walk-ins are welcome based on availability. For guaranteed spots, please book your tour in advance.',
    },
  ]

  return (
    <section className="py-16 lg:py-32 px-4 md:px-8 lg:px-12 bg-[#F8F8F8]">
      <div className="max-w-[800px] mx-auto">
        <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] font-semibold text-[#36454F] mb-12 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group border border-neutral-200 rounded-soft overflow-hidden bg-white transition-all duration-300"
            >
              <summary className="cursor-pointer list-none p-6 flex items-center justify-between hover:bg-[#F8F8F8] transition-colors duration-200">
                <h4 className="font-serif text-lg lg:text-2xl font-semibold text-[#36454F] pr-4">
                  {faq.question}
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
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

