# Manut.dev - SAM Deployment

This project uses AWS SAM (Serverless Application Model) for deployment.

## Deployment Files

- `samconfig.toml` - SAM configuration file
- `template.yaml` - AWS CloudFormation template defining the infrastructure
- `.github/workflows/` - CI/CD workflows for automated deployment

## Infrastructure

The SAM template deploys:
- S3 bucket for static website hosting
- CloudFront distribution with SSL certificate
- CloudFront Function for URL rewriting
- Response headers policy for security headers

## Deployment

### Manual Deployment
```bash
sam build
sam deploy
```

### Automated Deployment
The GitHub Actions workflows in `.github/workflows/` handle automated deployment:
- `static-website-deploy.yml` - Deploys the frontend to S3 and invalidates CloudFront cache
- `deploy-backend.yml` - Deploys backend infrastructure (if any)

## Domain

The site is configured to serve from:
- Primary domain: manut.dev
- Wildcard subdomain: *.manut.dev
