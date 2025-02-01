# ======= STAGE 1: Build the React App =======
# Use an official Node.js image as the build environment
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the source code into the container
COPY . .

# Build the React app for production
RUN npm run build

# ======= STAGE 2: Serve the React App with Nginx =======
# Use a lightweight Nginx image to serve the static files
FROM nginx:stable-alpine

# Remove the default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from the previous stage to Nginx’s public folder
COPY --from=build /app/dist /usr/share/nginx/html


# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
