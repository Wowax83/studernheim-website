'use client'

import { usePathname } from 'next/navigation'
import WhatsAppFloating from '@/app/components/whatsapp-floating'

export default function ConditionalWhatsApp() {
  const pathname = usePathname()

  // ❌ im Studio nicht anzeigen
  if (pathname.startsWith('/studio')) return null

  return <WhatsAppFloating />
}
