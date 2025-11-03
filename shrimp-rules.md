# Development Guidelines

## Project Overview

### AWS SAM Static Website Deployment
- This project uses AWS SAM to deploy a static website (manut.dev) with CloudFront distribution
- Infrastructure includes S3 bucket, CloudFront distribution, and CloudFront Function for URL rewriting
- Automated deployment is handled by GitHub Actions workflows

## Project Architecture

### Directory Structure
```
/
├── template.yaml              # AWS SAM infrastructure definition
├── samconfig.toml             # SAM deployment configuration
├── .github/workflows/         # CI/CD workflows
│   ├── static-website-deploy.yml    # Frontend deployment
│   └── deploy-backend.yml           # Infrastructure deployment
└── shrimp-rules.md           # This file - AI agent guidelines
```

### Core Components
- **template.yaml**: Contains all AWS infrastructure definitions
- **samconfig.toml**: Contains deployment configuration (region, stack name)
- **GitHub Actions**: Handle automated deployment for both frontend and infrastructure

## Code Standards

### YAML Formatting
- Use 2 spaces for indentation
- Use AWS intrinsic functions (!Ref, !Sub, !GetAtt)
- Follow AWS SAM resource naming conventions
- Resource names must use PascalCase

### CloudFront Function Code
- Use cloudfront-js-1.0 runtime
- Keep functions minimal and focused
- Test URL rewriting logic thoroughly

## Implementation Standards

### Infrastructure Changes
1. Modify template.yaml with required changes
2. Run `sam build` to validate template
3. Run `sam deploy` to apply changes
4. Always test infrastructure changes in non-production first

### Frontend Changes
1. Build the frontend application
2. Sync build output to S3 bucket
3. Invalidate CloudFront cache
4. Verify deployment in browser

### Security Requirements
- Always use Origin Access Control for S3
- Always redirect HTTP to HTTPS
- Never expose S3 bucket publicly
- Use TLSv1.2 or higher for CloudFront

## File Coordination Requirements

### Critical File Interactions
- **template.yaml ↔ samconfig.toml**: When adding new resources that require additional SAM capabilities
- **template.yaml ↔ GitHub Actions**: When adding new domains or changing distribution configuration
- **Build output directory ↔ GitHub Actions**: When changing the build output path, update static-website-deploy.yml

### Synchronization Rules
- When adding new domains to template.yaml Aliases, ensure ACM certificate covers all domains
- When modifying S3 bucket configuration, verify all CloudFront references remain valid
- When changing stack name in samconfig.toml, update all GitHub Actions references

## AI Decision-Making Standards

### Priority Order
1. **Security** > Performance > Cost
2. Always choose the most secure option that meets requirements
3. Prefer AWS managed services over custom implementations

### Common Decision Patterns
- **New Domain**: Add to template.yaml Aliases, verify ACM certificate, update CloudFront
- **Performance Optimization**: Modify CloudFront cache behaviors, adjust TTL values
- **Security Enhancement**: Update ResponseHeadersPolicy, add new security headers

### Error Handling
- Always include custom error responses for 403 and 404
- Use /404.html as the error page path
- Ensure error pages exist in the S3 bucket

## Prohibited Actions

### Security Prohibitions
- **NEVER** hardcode AWS credentials in any file
- **NEVER** expose S3 bucket publicly
- **NEVER** disable CloudFront OAC (Origin Access Control)
- **NEVER** use HTTP for production traffic

### Infrastructure Prohibitions
- **NEVER** modify S3 bucket properties outside template.yaml
- **NEVER** change CloudFront distribution settings outside template.yaml
- **NEVER** modify ACM certificate ARN without verifying certificate exists
- **NEVER** change S3 bucket name without updating all references

### Deployment Prohibitions
- **NEVER** deploy infrastructure changes without running `sam build` first
- **NEVER** skip CloudFront cache invalidation after frontend updates
- **NEVER** use different AWS regions across files without explicit coordination

## Required Tools and Commands

### SAM Commands
```bash
sam build      # Validate and build SAM template
sam deploy     # Deploy infrastructure changes
```

### AWS CLI Commands
```bash
aws s3 sync dist $S3_BUCKET_URL --delete                    # Sync frontend to S3
aws cloudfront create-invalidation --distribution-id $ID --paths "/*"  # Invalidate cache
```

## Testing Requirements

### Infrastructure Testing
- Always validate SAM template with `sam build` before deployment
- Test URL rewriting function in staging environment first
- Verify all security headers are properly configured

### Deployment Testing
- Verify website accessibility after deployment
- Test SSL certificate validity for all domains
- Confirm error pages display correctly
- Check security headers in browser dev tools
