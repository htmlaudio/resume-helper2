# Step 1: Build Stage
FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Production Stage
FROM nginx:stable-alpine AS production-stage

# --- NEW: Configure Nginx to listen on 8080 ---
# We use sed to swap 'listen 80;' for 'listen 8080;' in the default config
RUN sed -i 's/listen\(.*\)80;/listen 8080;/g' /etc/nginx/conf.d/default.conf

# Copy the build output
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Update EXPOSE to reflect the new port
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
