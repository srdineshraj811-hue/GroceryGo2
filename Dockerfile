# Build and run in one image
FROM node:22-alpine

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci

# Copy the rest
COPY . .

# 🔴 Build the client + bundle the server into /dist
RUN npm run build

# Runtime
ENV NODE_ENV=production
EXPOSE 8080
CMD ["npm", "start"]