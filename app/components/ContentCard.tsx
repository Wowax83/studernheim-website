'use client'

import {
  MapPin,
  Globe,
  MessageCircle,
  Instagram,
  Facebook,
  ClipboardList
} from 'lucide-react'
import Image from 'next/image'

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

export default function ContentCard({ item }: any) {
  const images = Array.isArray(item.images) ? item.images : []

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition">

      {/* Image */}
      <div className="relative aspect-[4/3] bg-gray-100">
        {images.length > 0 ? (
          <Image
            src={images[0]}
            alt={item.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Kein Bild
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">

        {item.location && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <MapPin size={14} />
            {item.location}
          </div>
        )}

        <h3 className="font-bold text-lg mb-2">{item.title}</h3>

        {item.description && (
          <p className="text-sm text-gray-600 mb-3">
            {item.description}
          </p>
        )}

        {/* QuickFacts */}
        {Array.isArray(item.quickFacts) && (
          <div className="flex flex-wrap gap-2 mb-3">
            {item.quickFacts.map((fact: string, i: number) => (
              <span
                key={i}
                className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full"
              >
                {fact}
              </span>
            ))}
          </div>
        )}

        {/* Highlights */}
        {Array.isArray(item.highlights) && (
          <div className="flex flex-wrap gap-2 mt-3">
            {item.highlights.map((h: any, i: number) => {
              if (!h?.url) return null
              const meta = getLinkMeta(h.url, h.text)
              const Icon = meta.icon

              return (
                <a
                  key={i}
                  href={h.url}
                  target="_blank"
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${meta.className}`}
                >
                  <Icon size={14} />
                  {meta.label}
                </a>
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}
