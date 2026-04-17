'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Globe,
  MessageCircle,
  Instagram,
  Facebook,
  ClipboardList
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

function getLinkMeta(url: string, text?: string) {
  const u = url.toLowerCase()

  if (u.includes('helferliste')) {
    return { label: text || 'Helferliste', icon: ClipboardList, className: 'bg-emerald-600 hover:bg-emerald-700 text-white' }
  }
  if (u.includes('wa.me') || u.includes('whatsapp')) {
    return { label: text || 'WhatsApp', icon: MessageCircle, className: 'bg-green-500 hover:bg-green-600 text-white' }
  }
  if (u.includes('instagram')) {
    return { label: text || 'Instagram', icon: Instagram, className: 'bg-pink-500 hover:bg-pink-600 text-white' }
  }
  if (u.includes('facebook')) {
    return { label: text || 'Facebook', icon: Facebook, className: 'bg-blue-600 hover:bg-blue-700 text-white' }
  }

  return { label: text || 'Website', icon: Globe, className: 'bg-gray-800 hover:bg-gray-900 text-white' }
}

export default function VereineClient({ vereine }: any) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section id="vereine" className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-3 md:px-4">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold">
            Unsere <span className="text-green-600">Vereine</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {Array.isArray(vereine) &&
            vereine.map((verein: any, index: number) => {
              if (!verein) return null

              // 🔥 SPLIT LOGIK
              const facts = Array.isArray(verein.highlights)
                ? verein.highlights.filter((item: any) => typeof item === 'string')
                : []

              const links = Array.isArray(verein.highlights)
                ? verein.highlights.filter((item: any) => item?.url)
                : []

              return (
                <motion.div
                  key={verein._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredCard(verein._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition"
                >

                  {/* Bild */}
                  {verein?.image && (
                    <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                      <Image
                        src={verein.image}
                        alt={verein.title}
                        fill
                        className="object-cover object-top scale-105"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4 md:p-5">

                    <h3 className="font-bold text-lg mb-2">
                      {verein?.title}
                    </h3>

                    {verein?.description && (
                      <p className="text-gray-600 text-sm mb-3">
                        {verein.description}
                      </p>
                    )}

                    {/* 🔥 QuickFacts → NUR HOVER + nur Desktop */}
                    {hoveredCard === verein._id && facts.length > 0 && (
                      <div className="hidden md:flex flex-wrap gap-2 mb-3">
                        {facts.map((fact: string, i: number) => (
                          <span
                            key={i}
                            className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full"
                          >
                            {fact}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* 🔥 Buttons → IMMER sichtbar */}
                    {links.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-3">
                        {links.map((item: any, i: number) => {
                          const meta = getLinkMeta(item.url, item.text)
                          const Icon = meta.icon

                          return (
                            <a
                              key={i}
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`
                                inline-flex items-center gap-2
                                text-sm font-semibold
                                px-4 py-2
                                rounded-xl
                                shadow-md hover:shadow-lg
                                transition-all duration-200
                                hover:scale-105
                                ${meta.className}
                              `}
                            >
                              <Icon size={16} />
                              {meta.label}
                            </a>
                          )
                        })}
                      </div>
                    )}

                  </div>
                </motion.div>
              )
            })}
        </div>

      </div>
    </section>
  )
}
