'use client'

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
import { useState, memo } from 'react'

/* 🔗 Link Meta */
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

/* 🔥 EINZELNE KARTE */
const FestCard = memo(function FestCard({ fest, openLightbox }: any) {
  const images = fest?.images || []
  const [index, setIndex] = useState(0)

  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd

    if (distance > minSwipeDistance) {
      setIndex((i) => (i + 1) % images.length)
    }
    if (distance < -minSwipeDistance) {
      setIndex((i) => (i - 1 + images.length) % images.length)
    }
  }

  const currentImage = images[index]

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">

      {/* Bild */}
      <div
        className="relative aspect-[4/3] bg-gray-100 overflow-hidden touch-pan-y"
        onTouchStart={(e) => {
          setTouchEnd(null)
          setTouchStart(e.targetTouches[0].clientX)
        }}
        onTouchMove={(e) => {
          setTouchEnd(e.targetTouches[0].clientX)
        }}
        onTouchEnd={handleSwipe}
      >
        {currentImage ? (
          <Image
            src={currentImage}
            alt={fest?.name || 'Fest'}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 33vw"
            quality={60}
            className="object-cover cursor-zoom-in"
            onClick={() => openLightbox(images, index)}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Kein Bild vorhanden
          </div>
        )}

        {/* Desktop Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded opacity-80 hover:opacity-100"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => setIndex((i) => (i + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded opacity-80 hover:opacity-100"
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

        {/* 🔥 BADGES (Hover + Mobile sichtbar) */}
        {Array.isArray(fest?.quickFacts) && (
          <div className="flex flex-wrap gap-2 mb-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-1 md:group-hover:translate-y-0 transition-all duration-300">
            {fest.quickFacts.map((fact: any, i: number) => (
              <span
                key={i}
                className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full"
              >
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
    </div>
  )
})

/* 🔥 MAIN COMPONENT */
export default function FesteClient({ feste }: any) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  return (
    <section id="feste" className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-3 md:px-4">

        {/* Titel */}
        <div
          ref={ref}
          className={`text-center mb-10 md:mb-12 transition-opacity duration-700 ${
            inView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold">
            Unsere <span className="text-green-600">Feste</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {feste?.map((fest: any) => (
            <FestCard
              key={fest._id}
              fest={fest}
              openLightbox={(images: string[], index: number) => {
                setLightboxImages(images)
                setLightboxIndex(index)
              }}
            />
          ))}
        </div>

      </div>

      {/* 🔥 LIGHTBOX */}
      {lightboxImages && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">

          {/* Close */}
          <button
            onClick={() => setLightboxImages(null)}
            className="absolute top-5 right-5 text-white"
          >
            <X size={32} />
          </button>

          {/* Prev */}
          <button
            onClick={() =>
              setLightboxIndex((i) =>
                (i - 1 + lightboxImages.length) % lightboxImages.length
              )
            }
            className="absolute left-5 text-white"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Next */}
          <button
            onClick={() =>
              setLightboxIndex((i) =>
                (i + 1) % lightboxImages.length
              )
            }
            className="absolute right-5 text-white"
          >
            <ChevronRight size={32} />
          </button>

          {/* Bild */}
          <Image
            src={lightboxImages[lightboxIndex]}
            alt="Bild"
            width={1200}
            height={800}
            priority
            className="max-h-[90vh] object-contain"
          />
        </div>
      )}
    </section>
  )
}
