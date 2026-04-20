'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
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
    return { label: text || 'Helferliste', icon: ClipboardList, className: 'bg-emerald-600 text-white' }
  }
  if (u.includes('wa.me') || u.includes('whatsapp')) {
    return { label: text || 'WhatsApp', icon: MessageCircle, className: 'bg-green-500 text-white' }
  }
  if (u.includes('instagram')) {
    return { label: text || 'Instagram', icon: Instagram, className: 'bg-pink-500 text-white' }
  }
  if (u.includes('facebook')) {
    return { label: text || 'Facebook', icon: Facebook, className: 'bg-blue-600 text-white' }
  }

  return { label: text || 'Website', icon: Globe, className: 'bg-gray-800 text-white' }
}

export default function FesteClient({ feste }: any) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({})
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // 👉 Swipe States
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const minSwipeDistance = 50

  const handleSwipe = (festId: string, imagesLength: number, currentIndex: number) => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd

    if (distance > minSwipeDistance) {
      setCurrentImageIndex((p) => ({
        ...p,
        [festId]: (currentIndex + 1) % imagesLength
      }))
    }

    if (distance < -minSwipeDistance) {
      setCurrentImageIndex((p) => ({
        ...p,
        [festId]: (currentIndex - 1 + imagesLength) % imagesLength
      }))
    }
  }

  const nextImage = () => {
    if (!lightboxImages) return
    setLightboxIndex((prev) => (prev + 1) % lightboxImages.length)
  }

  const prevImage = () => {
    if (!lightboxImages) return
    setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length)
  }

  return (
    <section id="feste" className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-3 md:px-4">

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold">
            Unsere <span className="text-green-600">Feste</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {feste?.map((fest: any, index: number) => {
            const images = fest?.images || []
            const currentIndex = currentImageIndex[fest._id] || 0
            const currentImage = images[currentIndex]

            return (
              <motion.div
                key={fest._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition"
              >

                {/* 🔥 Swipe Bereich */}
                <div
                  className="relative aspect-[4/3] bg-gray-100 overflow-hidden touch-pan-y"
                  onTouchStart={(e) => {
                    setTouchEnd(null)
                    setTouchStart(e.targetTouches[0].clientX)
                  }}
                  onTouchMove={(e) => {
                    setTouchEnd(e.targetTouches[0].clientX)
                  }}
                  onTouchEnd={() =>
                    handleSwipe(fest._id, images.length, currentIndex)
                  }
                >
                  {currentImage ? (
                    <Image
                      src={currentImage}
                      alt={fest?.name || 'Fest'}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      onClick={() => {
                        setLightboxImages(images)
                        setLightboxIndex(currentIndex)
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                      Kein Bild vorhanden
                    </div>
                  )}

                  {/* 👉 Klick Buttons (Desktop) */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setCurrentImageIndex((p) => ({
                            ...p,
                            [fest._id]: (currentIndex - 1 + images.length) % images.length
                          }))
                        }
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded"
                      >
                        <ChevronLeft size={18} />
                      </button>

                      <button
                        onClick={() =>
                          setCurrentImageIndex((p) => ({
                            ...p,
                            [fest._id]: (currentIndex + 1) % images.length
                          }))
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 md:p-5">

                  {fest?.region && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <MapPin size={14} />
                      {fest.region}
                    </div>
                  )}

                  <h3 className="font-bold text-lg mb-2">{fest?.name}</h3>

                  {fest?.description && (
                    <p className="text-gray-600 text-sm mb-3">
                      {fest.description}
                    </p>
                  )}

                  {Array.isArray(fest?.quickFacts) && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {fest.quickFacts.map((fact: any, i: number) => (
                        <span key={i} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                          {fact}
                        </span>
                      ))}
                    </div>
                  )}

                  {Array.isArray(fest?.highlights) && (
                    <div className="flex flex-wrap gap-3 mt-3">
                      {fest.highlights.map((item: any, i: number) => {
                        if (!item?.url) return null
                        const meta = getLinkMeta(item.url, item.text)
                        const Icon = meta.icon

                        return (
                          <a
                            key={i}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl shadow hover:scale-105 transition ${meta.className}`}
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

        {/* Lightbox */}
        {lightboxImages && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
            <button onClick={() => setLightboxImages(null)} className="absolute top-5 right-5 text-white">
              <X size={32} />
            </button>

            <button onClick={prevImage} className="absolute left-5 text-white">
              <ChevronLeft size={32} />
            </button>

            <button onClick={nextImage} className="absolute right-5 text-white">
              <ChevronRight size={32} />
            </button>

            <Image
              src={lightboxImages[lightboxIndex]}
              alt="Bild"
              width={1200}
              height={800}
              className="max-h-[90vh] object-contain"
            />
          </div>
        )}
      </div>
    </section>
  )
}
