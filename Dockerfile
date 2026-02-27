FROM node:20 AS deps
WORKDIR /app


# Only copy package files first (for caching)
COPY package.json package-lock.json* ./

RUN npm install --production=false

FROM node:20 AS builder
WORKDIR /app

COPY . .
COPY prisma ./prisma
COPY .env .env
COPY --from=deps /app/node_modules ./node_modules

RUN npm install -g npm@11

RUN npm run build

FROM node:20 AS runner
WORKDIR /app

RUN apt-get update && apt-get install -y netcat-openbsd

ENV NODE_ENV=production

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

COPY wait-for-db.sh ./wait-for-db.sh
RUN chmod +x wait-for-db.sh

EXPOSE 3000

CMD ["npm", "start"]