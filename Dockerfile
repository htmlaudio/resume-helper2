# Step 1: Build Stage
FROM node:20-alpine AS build-stage

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm install

# Copy the rest of your code
COPY . .

# Build the project (Vite creates the /dist folder)
RUN npm run build

# Step 2: Production Stage
FROM nginx:stable-alpine AS production-stage

# Copy the build output from the first stage to Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
