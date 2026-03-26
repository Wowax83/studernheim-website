'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Tag } from 'lucide-react'
import Image from 'next/image'
import { vereine } from '@/lib/data'

export default function Vereine() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section id="vereine" className="py-20 sm:py-28 bg-gradient-to-b from-white to-emerald-50/30 relative">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-5">
        <div className="relative w-full h-full">
          <Image
            src="https://cdn.abacus.ai/images/343e57ca-3a3c-4047-95b4-070c90b49b4a.png"
            alt="Background"
            fill
            className="object-cover"
            sizes="100vw"
          />
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
            Unsere <span className="gradient-text">Vereine</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Vielfältige Gemeinschaften, die unser Dorfleben bereichern und prägen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vereine.map((verein, index) => (
            <motion.div
              key={verein.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium mb-3">
                    <Tag size={14} />
                    {verein.category}
                  </div>
                  
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {verein.name}
                  </h3>
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                {verein.description}
              </p>
              
              {verein.contact && (
                <a
                  href={`mailto:${verein.contact}`}
                  className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  <Mail size={16} />
                  {verein.contact}
                </a>
              )}

              {/* Decorative Element */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
