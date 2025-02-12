# Use official Node.js image as the base image alpine is slim
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the rest of the application (excluding `node_modules` due to .dockerignore)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port (if this is a React/Vite app, the default port is 5173)
EXPOSE 5173

# Set the command to run the app
CMD ["npm", "run", "dev"]
