FROM node:20-alpine AS runtime
WORKDIR /app

COPY package.json ./
COPY apps ./apps
COPY docs ./docs
COPY database ./database
COPY README.md ./

ENV NODE_ENV=production
EXPOSE 8080

CMD ["node", "apps/backend/src/index.mjs"]
