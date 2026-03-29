'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Users, Info } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function VereineClient({ vereine }: any) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05
  })

  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section id="vereine" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Unsere <span className="text-green-600">Vereine</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Unsere Vereine sind das Herz der Gemeinschaft – engagiert, vielfältig und lebendig.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {vereine?.map((verein: any, index: number) => (
            <motion.div
              key={verein._id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(verein._id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >

              {/* Image */}
              {verein.image && (
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={verein.image}
                    alt={verein.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">

                {/* Title */}
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {verein.name}
                </h3>

                {/* Category */}
                {verein.category && (
                  <p className="text-green-600 font-medium text-sm mb-3">
                    {verein.category}
                  </p>
                )}

                {/* Description */}
                {verein.description && (
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {verein.description}
                  </p>
                )}

                {/* Quick Facts */}
                {hoveredCard === verein._id && verein.quickFacts && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="border-t border-gray-200 pt-4 mt-4 space-y-2"
                  >
                    <div className="flex items-start gap-2 text-sm">
                      <Info size={16} className="text-green-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">
                          Details:
                        </p>
                        <ul className="space-y-1 text-gray-600">
                          {verein.quickFacts.map((fact: string, i: number) => (
                            <li key={i} className="text-xs">• {fact}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Contact */}
                {verein.contact && (
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
                    <Users size={14} />
                    {verein.contact}
                  </div>
                )}

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
