'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppFloating() {
  return (
    <motion.a
      href="https://whatsapp.com/channel/0029Vb9viRu2P59cxukbdc2Y"
      target="_blank"
      rel="noopener noreferrer"

      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.4 }}

      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}

      className="fixed bottom-6 right-6 z-50 flex items-center gap-2
      bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full
      shadow-xl hover:shadow-2xl transition-all"
    >
      <MessageCircle size={20} />

      <span className="text-sm font-semibold hidden sm:block">
        News
      </span>

      {/* 🔥 Pulse Effekt */}
      <span className="absolute inset-0 rounded-full bg-green-400 opacity-30 animate-ping -z-10" />
    </motion.a>
  )
}
