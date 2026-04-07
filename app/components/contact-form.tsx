'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, User, Mail, MessageSquare, Heart } from 'lucide-react'
import { useState, FormEvent } from 'react'

const interests = [
  'Mitglied werden',
  'Events & Feste',
  'Ehrenamt',
  'Allgemeine Anfrage'
]

export default function ContactForm() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      interests: selectedInterests,
      company: formData.get('company'), // honeypot
      formStartTime: Number(formData.get('formStartTime'))
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        setIsSuccess(true)
        form.reset()
        setSelectedInterests([])
      } else {
        alert('Fehler beim Senden')
      }
    } catch (err) {
      console.error(err)
      alert('Serverfehler')
    }

    setIsSubmitting(false)
  }

  return (
    <section id="kontakt" className="py-20 sm:py-28 bg-gradient-to-b from-white to-green-50/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Kontakt <span className="gradient-text">SAG Studernheim</span>
          </h2>

          <p className="text-lg text-gray-600">
            Du hast Fragen, Ideen oder möchtest mitmachen? Schreib uns einfach!
          </p>
        </motion.div>

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-10"
        >
          {isSuccess ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-green-600" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Danke dir!
              </h3>

              <p className="text-gray-600">
                Deine Nachricht ist bei uns angekommen 🙌
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* 🛡️ Honeypot */}
              <input
                type="text"
                name="company"
                className="hidden"
                autoComplete="off"
              />

              {/* ⏱️ Zeit */}
              <input
                type="hidden"
                name="formStartTime"
                value={Date.now()}
              />

              {/* NAME */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <div className="relative">
                  <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                    placeholder="Dein Name"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-Mail *
                </label>
                <div className="relative">
                  <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                    placeholder="deine@email.de"
                  />
                </div>
              </div>

              {/* INTERESSEN */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Worum geht's?
                </label>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2 rounded-full text-sm transition ${
                        selectedInterests.includes(interest)
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nachricht *
                </label>
                <div className="relative">
                  <MessageSquare size={20} className="absolute left-4 top-4 text-gray-400" />
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 resize-none"
                    placeholder="Deine Nachricht..."
                  />
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Nachricht senden
                  </>
                )}
              </button>

            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
