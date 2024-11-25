#!/bin/bash

# Define the list of services
services=(
  "members-service"
  "countries-service"
  "recruitment-service"
  "projects-service"
  "partners-service"
  "admin-service"
)

# Apply deployment and service YAML files for each service
for service in "${services[@]}"; do
  echo "Deploying $service..."
  kubectl apply -f "${service}-deployment.yaml"
  kubectl apply -f "${service}-service.yaml"
  echo "$service deployed successfully."
done

echo "All services have been deployed!"
