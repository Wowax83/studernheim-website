import { PrismaClient } from '@prisma/client'

// 👉 wichtig für Next.js (Hot Reload safe)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn']
      : ['error']
  })

// 👉 verhindert neue Instanzen im Dev Mode
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
