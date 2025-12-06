# Stage 1: Build Angular app
# 🎯 FIX 1: Use a specific, stable Node version (Node 25 does not exist yet; assuming you meant Node 20 or the latest LTS, 24 is used as a placeholder)
# Always check Docker Hub for the latest secure tag for Node 20/22/24 on Alpine.
FROM node:24-alpine AS build

WORKDIR /app

# 🎯 FIX 2: Update all system packages immediately to patch critical/high vulnerabilities
RUN apk update && apk upgrade && rm -rf /var/cache/apk/*

# Copy package files first and install dependencies
# Note: Ensure package*.json are in the build context (likely the frontend folder)
COPY package*.json ./
# Install ALL dependencies including devDependencies for building
RUN npm ci --include=dev

# Copy rest of the app source code
COPY . .

# Build Angular for production
RUN npm run build -- --output-path=dist --configuration production --base-href /

# 🎯 INSERT THIS DEBUG COMMAND: List contents of the output directory
RUN ls -la dist/
# --------------------------------------------------------------------------

# Stage 2: Serve with Nginx
# 🎯 FIX 3: Use a specific, stable Nginx tag that is based on a recent Alpine version
FROM nginx:stable-alpine

# 🎯 FIX 4: Update system packages for the serving stage too (minimal image security)
RUN apk update && apk upgrade && rm -rf /var/cache/apk/*

RUN rm -rf /usr/share/nginx/html/*
# This path is the critical point:
COPY --from=build /app/dist/browser /usr/share/nginx/html


COPY default.conf /etc/nginx/conf.d/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]