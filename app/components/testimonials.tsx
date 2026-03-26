'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Quote } from 'lucide-react'
import { testimonials } from '@/lib/data'

export default function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-green-50/30 to-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Stimmen aus <span className="gradient-text">Studernheim</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Was unsere Einwohner und Besucher über unser Dorf sagen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Quote size={28} className="text-white" />
              </div>

              {/* Content */}
              <div className="mt-6">
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-heading font-bold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-green-600">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-green-50 to-transparent rounded-tl-full opacity-50 -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
