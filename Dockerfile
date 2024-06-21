# Gunakan image Node.js sebagai base image
FROM node:14-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file ke dalam container
COPY . .

# Build aplikasi Vue.js
RUN npm run build

# Gunakan image Nginx untuk serving aplikasi
FROM nginx:1.19.0-alpine

# Copy hasil build dari stage sebelumnya ke direktori Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx.conf ke dalam container
COPY ./.docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
