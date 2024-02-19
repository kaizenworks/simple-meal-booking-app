#!/bin/bash

# Update repo
git pull

# Stop container
docker-compose -f docker-compose.production.yaml down

# Remove Docker image
DOCKER_IMAGE_NAME="dockerhub-image-name"
DOCKER_IMAGE_ID=$(docker images | grep "$DOCKER_IMAGE_NAME" | awk '{print $3}' )

if [ -z "$DOCKER_IMAGE_ID" -o "$DOCKER_IMAGE_ID" == " " ]; then
	echo "---- No images available for deletion ----"
else
	docker rmi -f $DOCKER_IMAGE_ID
fi

# Build Docker containers
docker-compose -f docker-compose.production.yaml build --no-cache

# Run Docker containers
docker-compose -f docker-compose.production.yaml up -d


exit