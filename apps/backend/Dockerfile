# Backend Dockerfile – for AWS ECS, ECR, or any container deploy.
# Build from repo root: docker build -f apps/backend/Dockerfile .
FROM node:20-alpine

WORKDIR /app
COPY package.json package-lock.json* ./
COPY apps/backend apps/backend

RUN npm install --workspace=backend --omit=dev

ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "apps/backend/src/index.js"]
