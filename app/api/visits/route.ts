import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // 👉 bestehenden Counter holen
    let visit = await prisma.visit.findUnique({
      where: { id: 1 }
    })

    // 👉 wenn noch nicht existiert → erstellen
    if (!visit) {
      visit = await prisma.visit.create({
        data: {
          id: 1,
          count: 1
        }
      })
    } else {
      // 👉 sonst erhöhen
      visit = await prisma.visit.update({
        where: { id: 1 },
        data: {
          count: {
            increment: 1
          }
        }
      })
    }

    return NextResponse.json({ count: visit.count })

  } catch (error) {
    console.error('Visit counter error:', error)

    return NextResponse.json(
      { error: 'Failed to update counter' },
      { status: 500 }
    )
  }
}
