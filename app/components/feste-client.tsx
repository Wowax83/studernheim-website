'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, MapPin, Info } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function FesteClient({ feste }: any) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05
  })

  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section id="feste" className="py-20 sm:py-28 bg-gradient-to-b from-green-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={ref} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Unsere <span className="text-green-600">Feste</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feste.map((fest: any, index: number) => (
            <div
              key={fest._id}
              onMouseEnter={() => setHoveredCard(fest._id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={fest.image}
                  alt={fest.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="text-xl font-bold">{fest.name}</h3>
                <p className="text-sm text-gray-500">{fest.region}</p>
                <p className="text-sm mt-2">{fest.description}</p>

                <p className="text-green-600 text-sm mt-2">
                  {fest.vibe}
                </p>

                {hoveredCard === fest._id && (
                  <ul className="mt-2 text-xs">
                    {fest.quickFacts?.map((fact: string, i: number) => (
                      <li key={i}>• {fact}</li>
                    ))}
                  </ul>
                )}

                <p className="text-xs mt-2 text-gray-500">
                  {fest.organizer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
