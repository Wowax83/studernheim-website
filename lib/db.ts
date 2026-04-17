import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// 👉 nur initialisieren wenn DB vorhanden
export const prisma =
  process.env.DATABASE_URL
    ? globalForPrisma.prisma ??
      new PrismaClient({
        log:
          process.env.NODE_ENV === 'development'
            ? ['query', 'error', 'warn']
            : ['error']
      })
    : null

// 👉 Dev Mode Fix
if (process.env.NODE_ENV !== 'production' && prisma) {
  globalForPrisma.prisma = prisma
}
