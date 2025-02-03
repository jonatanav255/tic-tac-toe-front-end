#!/bin/bash

# Remove any existing container named TictacFrontEnd.
echo "Removing existing TictacFrontEnd container (if any)..."
docker rm -f TictacFrontEnd 2>/dev/null

# Build the Docker image locally from your Dockerfile.
echo "Building the React front-end image..."
docker build -t jonatanav255/my-react-app:latest .

# Push the newly built image to Docker Hub.
echo "Pushing the image to Docker Hub..."
docker push jonatanav255/my-react-app:latest

# Run a new container from the pushed image.
# This maps port 3000 on your host to port 80 in the container.
echo "Running the new TictacFrontEnd container..."
docker run --name TictacFrontEnd -p 3000:80 -d jonatanav255/my-react-app:latest

echo "Done. The front-end should be accessible on http://localhost:3000"
