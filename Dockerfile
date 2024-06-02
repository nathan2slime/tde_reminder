FROM node:18-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN corepack enable
COPY . .

FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/ .
RUN yarn install

ENV NODE_ENV production
RUN yarn build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs
COPY --from=installer --chown=nodejs:nodejs /app .

WORKDIR /app
CMD yarn migrate:deploy && yarn start
