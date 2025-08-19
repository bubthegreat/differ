# ArgoCD App-of-Apps for Differ Application

This directory contains ArgoCD manifests for deploying the Differ application using the app-of-apps pattern.

## Structure

```
argocd/
├── differ-apps.yaml          # Root application (app-of-apps)
├── apps/
│   ├── differ-staging.yaml   # Staging environment application
│   └── differ-prod.yaml      # Production environment application
├── projects/
│   └── differ-project.yaml   # ArgoCD project definition
└── README.md
```

## Deployment

### 1. Deploy the ArgoCD Project (Optional but recommended)
```bash
kubectl apply -f argocd/projects/differ-project.yaml
```

### 2. Deploy the App-of-Apps
```bash
kubectl apply -f argocd/differ-apps.yaml
```

This will automatically create and manage:
- `differ-staging` application → deploys to `differ-staging` namespace
- `differ-prod` application → deploys to `differ-prod` namespace

## Features

### Automated Sync
- All applications are configured with automated sync
- Self-healing enabled (will revert manual changes)
- Auto-pruning enabled (will remove resources not in Git)

### Image Updates
The applications will automatically use the latest images built by the GitHub Actions workflow:
- `bubthegreat/differ-api:latest`
- `bubthegreat/differ-ui:latest`

### Environments

#### Staging (`differ-staging`)
- Namespace: `differ-staging`
- Replicas: 2 for both API and UI
- Source: `k8s/overlays/staging`

#### Production (`differ-prod`)
- Namespace: `differ-prod`
- Replicas: 2 for both API and UI
- Source: `k8s/overlays/prod`

## Monitoring

You can monitor the applications in the ArgoCD UI:
- Root app: `differ-apps`
- Child apps: `differ-staging`, `differ-prod`

## Manual Sync

If needed, you can manually sync applications:
```bash
argocd app sync differ-staging
argocd app sync differ-prod
```

## Troubleshooting

### Check Application Status
```bash
kubectl get applications -n argocd
```

### View Application Details
```bash
kubectl describe application differ-staging -n argocd
```

### Force Refresh
```bash
argocd app get differ-staging --refresh
```
