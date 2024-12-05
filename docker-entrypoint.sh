#!/bin/sh

# Run Prisma migrations
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

npx prisma db seed

# Start the application
npm run dev