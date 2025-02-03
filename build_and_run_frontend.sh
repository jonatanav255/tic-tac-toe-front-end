#!/bin/bash

# Stop and remove any existing container with the same name.
echo "Removing existing TictacFrontEnd container (if any)..."
docker rm -f TictacFrontEnd 2>/dev/null

# Build the Docker image.
echo "Building the React front-end image..."
docker build -t jonatanav255/my-react-app:latest .

# Run the new container.
# This maps port 3000 on your host to port 80 in the container (as defined in the Dockerfile).
echo "Running the new TictacFrontEnd container..."
docker run --name TictacFrontEnd -p 3000:80 -d jonatanav255/my-react-app:latest

echo "Done. The front-end should be accessible on http://localhost:3000"
