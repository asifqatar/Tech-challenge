# Use a supported Node.js version
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (including Prisma)
RUN npm install --legacy-peer-deps

# Copy the Prisma schema and other application files
# COPY ./prisma ./prisma

# Ensure Prisma Client is generated
# RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Expose the desired port (e.g., 3000)
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start"]
