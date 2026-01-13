# --- Stage 1: Build ---
FROM node:20-alpine AS build-stage
WORKDIR /app

# Install dependencies first (better for Docker layer caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the project
# This generates the 'dist' folder
RUN npm run build

# --- Stage 2: Serve ---
FROM nginx:stable-alpine AS production-stage

# 1. Change Nginx port to 8080
# By default, Nginx listens on 80. We change it to 8080 here.
RUN sed -i 's/listen\(.*\)80;/listen 8080;/g' /etc/nginx/conf.d/default.conf

# 2. Copy the 'dist' folder from the build stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 3. Security: Set ownership so Nginx can read the files
RUN chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
