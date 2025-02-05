# ======= STAGE 1: Build the React App =======
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the .env.production file to the working directory
COPY .env.production ./

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the source code into the container
COPY . .

# Build the React app for production
RUN npm run build

# ======= STAGE 2: Serve the React App with Nginx =======
FROM nginx:stable-alpine

# Remove the default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from the previous stage to Nginx’s public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
