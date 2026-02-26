# ---------- Stage 1 ----------
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy remaining files
COPY . .

# Expose port
EXPOSE 5000

# Start server
CMD ["node", "server.js"]