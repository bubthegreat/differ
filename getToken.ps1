# Apply the service account locally because it's easier this way.
kubectl apply -f service-account.yml

# Print out the token shite
kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | sls admin-user | ForEach-Object { $_ -Split '\s+' } | Select -First 1)

# Run the kubectl proxy
Write-Output "Available at http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/#/settings?namespace=default"
kubectl proxy