# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy only frontend files
COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:22-alpine

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Start command
CMD ["serve", "-s", "dist", "-l", "3000"]

