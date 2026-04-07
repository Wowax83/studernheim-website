# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build


# Production Stage
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# 👉 GANZ WICHTIG: nur das Nötige kopieren
COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]
