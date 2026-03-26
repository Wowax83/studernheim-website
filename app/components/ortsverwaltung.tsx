'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Phone, Mail, Clock, CheckCircle, User } from 'lucide-react'
import Image from 'next/image'
import { ortsverwaltungData } from '@/lib/data'

export default function Ortsverwaltung() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section id="ortsverwaltung" className="py-20 sm:py-28 bg-gradient-to-b from-white to-green-50/30 relative">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-5">
        <div className="relative w-full h-full">
          <Image
            src="https://cdn.abacus.ai/images/d0da96ef-8023-4ee1-92bc-a8a43f50e084.png"
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
            <span className="gradient-text">Ortsverwaltung</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Ihre Ansprechpartner für alle Anliegen rund um unser Dorf.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact & Hours */}
          <div className="space-y-6">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <MapPin className="text-green-600" size={28} />
                Kontakt
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Adresse</p>
                    <p className="text-gray-600">{ortsverwaltungData.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Telefon</p>
                    <a href={`tel:${ortsverwaltungData.phone}`} className="text-green-600 hover:text-green-700 transition-colors">
                      {ortsverwaltungData.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">E-Mail</p>
                    <a href={`mailto:${ortsverwaltungData.email}`} className="text-green-600 hover:text-green-700 transition-colors">
                      {ortsverwaltungData.email}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Opening Hours */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Clock className="text-green-600" size={28} />
                Öffnungszeiten
              </h3>
              
              <div className="space-y-3">
                {ortsverwaltungData.openingHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="font-medium text-gray-900">{schedule.day}</span>
                    <span className="text-gray-600">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Services & Contacts */}
          <div className="space-y-6">
            {/* Services */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle className="text-green-600" size={28} />
                Unsere Leistungen
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ortsverwaltungData.services.map((service, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Team Contacts */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <User className="text-green-600" size={28} />
                Ansprechpartner
              </h3>
              
              <div className="space-y-4">
                {ortsverwaltungData.contacts.map((contact, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-green-50/50 hover:bg-green-50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {contact.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{contact.name}</p>
                      <p className="text-sm text-gray-600 mb-1">{contact.role}</p>
                      <a href={`tel:${contact.phone}`} className="text-sm text-green-600 hover:text-green-700 transition-colors">
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
