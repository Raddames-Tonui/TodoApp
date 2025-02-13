# Frontend Docker Setup

This project uses Docker to containerize a React application, with options for both **Single-Stage** and **Multi-Stage** builds.

## 🚀 Single vs. Multi-Stage Builds

### 🏗 Single-Stage Build
- Uses **one container** for both development and production.
- Keeps **node_modules** and unnecessary files inside the image.
- **Best for local development**, but results in a larger image for production.

```dockerfile
# Use official Node.js image as the base image
FROM node:18-alpine

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

# Expose the development port (Vite default: 5173)
EXPOSE 5173

# Start the app in development mode
CMD ["npm", "run", "dev"]
```

### 🏆 Multi-Stage Build (Optimized for Production)
- Uses **two stages** to keep the final image small.
- First stage (`builder`) compiles the app.
- Second stage (`nginx`) serves only the built static files.
- **Best for production deployment** as it removes unnecessary files.

```dockerfile
# 1️⃣ Build Stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 2️⃣ Production Stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Use a custom Nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
```

## 📦 Build & Push to Docker Hub

1. **Build the production image:**
   ```sh
   docker build -t your-dockerhub-username/frontend-app .
   ```

2. **Run locally:**
   ```sh
   docker run -p 8080:80 your-dockerhub-username/frontend-app
   ```

3. **Push to Docker Hub:**
   ```sh
   docker tag your-dockerhub-username/frontend-app your-dockerhub-username/frontend-app:latest
   docker push your-dockerhub-username/frontend-app:latest
   ```

## 🔧 Nginx Configuration for SPA

The `nginx.conf` ensures correct routing for the React SPA:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    error_page 404 /index.html;
}
```

### Explanation:
- **`try_files $uri /index.html;`** → If a requested file isn’t found, serve `index.html` so React handles routing.
- **`error_page 404 /index.html;`** → Ensures non-existent routes return the React app, preventing 404 errors.

This setup allows smooth navigation in a React SPA without broken routes when refreshing a page.

---

🔥 **Single-stage is good for development, but multi-stage is best for production!** 🚀

