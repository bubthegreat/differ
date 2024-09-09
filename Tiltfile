allow_k8s_contexts('docker-desktop')

# Define the namespace where everything will be deployed
k8s_namespace('differ')
k8s_yaml('local-k8s/common/namespace.yaml')

# Load Kubernetes YAMLs for the Redis deployment and service
k8s_yaml('local-k8s/infra/redis.yaml')

# Load Kubernetes YAMLs for the Frontend
k8s_yaml('local-k8s/api/deployment.yaml')
k8s_yaml('local-k8s/api/service.yaml')

# Load Kubernetes YAMLs for the backend
k8s_yaml('local-k8s/app/deployment.yaml')
k8s_yaml('local-k8s/app/service.yaml')

# Load ingress after other stuff so it has active targets.
k8s_yaml('local-k8s/common/ingress.yaml')

# Define local Docker build for Frontend Angular app
docker_build('differ-app', './differ-app/')

# Define local Docker build for Backend FastAPI app
docker_build('differ-api', './differ-api/')

# Kubernetes resource management
# For the frontend app
k8s_resource('differ-app', port_forwards=[8080])
# For the backend app
k8s_resource('differ-api', port_forwards=[8000])

# Assumes you've got ingress controller and an updated version of k8s: 

# kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.11.2/deploy/static/provider/cloud/deploy.yaml
