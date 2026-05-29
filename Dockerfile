# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package management files
COPY package*.json ./
RUN npm ci

# Copy the rest of the application files
COPY . .

# Initialize Nuxt 4 types and compile the optimized production bundle
RUN npx nuxt prepare
RUN npm run build

# Stage 2: Clean production runner
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Copy the lightweight compiled output from the builder stage
COPY --from=builder /app/.output ./.output

# Create the internal database folder
RUN mkdir -p /app/data

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]