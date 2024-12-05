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

# Copy the entry point script
COPY docker-entrypoint.sh ./

# Expose the desired port (e.g., 3000)
EXPOSE 3000

# Set the entry point to the script
ENTRYPOINT ["./docker-entrypoint.sh"]

# Run the application
CMD ["npm", "run", "start"]
