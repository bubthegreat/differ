allow_k8s_contexts('docker-desktop')

# Use Kustomize to load all Kubernetes resources for local development
k8s_yaml(kustomize('k8s/overlays/local'))

# Define local Docker build for Frontend Angular app
docker_build('differ-ui', './differ-app/')

# Define local Docker build for Backend FastAPI app
docker_build('differ-api', './differ-api/')

# Kubernetes resource management
# For the frontend app
k8s_resource('differ-ui', port_forwards=[8080])
# For the backend app
k8s_resource('differ-api', port_forwards=[8000])
