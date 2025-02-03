#!/bin/bash

# Print a message indicating the start of the process.
echo "Pulling the image from Docker Hub..."

# Pull the latest image from Docker Hub.
docker pull jonatanav255/my-react-app:latest

# Remove any existing container named TictacFrontEnd (if it exists).
echo "Removing any existing container named TictacFrontEnd..."
docker rm -f TictacFrontEnd 2>/dev/null

# Run a new container from the pulled image.
# This maps port 3000 on the host to port 80 in the container.
echo "Running the new container..."
docker run --name TictacFrontEnd -p 3000:80 -d jonatanav255/my-react-app:latest

# Print a final message.
echo "Done. The front-end should be accessible on http://localhost:3000"
