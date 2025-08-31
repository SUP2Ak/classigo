# Deployment Guide

This guide explains how to deploy Classigo to npm and GitHub Pages using GitHub Actions.

## 🚀 Manual Workflows

### Publishing to npm

Use the **"Publish Package"** workflow to publish a new version to npm:

1. Go to **Actions** → **Publish Package**
2. Click **"Run workflow"**
3. Configure the inputs:
   - **Version**: `patch`, `minor`, `major`, or specific version (e.g., `1.2.3`)
   - **Create git tag**: Check to create a git tag and GitHub release
4. Click **"Run workflow"**

The workflow will:
- ✅ Run linting and tests
- ✅ Build production bundle
- ✅ Update package version
- ✅ Publish to npm
- ✅ Create git tag and GitHub release (if enabled)

### Deploying to GitHub Pages

Use the **"Deploy to gh-pages Branch"** workflow to update the live examples:

1. Go to **Actions** → **Deploy to gh-pages Branch**
2. Click **"Run workflow"**
3. Select the source branch (default: `main`)
4. Click **"Run workflow"**

The workflow will:
- ✅ Run linting and tests
- ✅ Build production bundle
- ✅ Copy examples to gh-pages branch
- ✅ Deploy to GitHub Pages

## 🔄 Automatic Deployment

### GitHub Pages Auto-deploy

The **"Deploy to gh-pages Branch"** workflow also runs automatically when:
- Changes are pushed to `main` branch
- Files in `examples/` directory are modified

This ensures your live examples are always up-to-date.

## 📋 Prerequisites

### npm Publishing

1. **NPM_TOKEN**: Add your npm access token to GitHub secrets
   - Go to npm → Access Tokens → Generate new token
   - Add to GitHub: Settings → Secrets → `NPM_TOKEN`

2. **Repository permissions**: Ensure the workflow has write permissions
   - Settings → Actions → General → Workflow permissions
   - Enable "Read and write permissions"

### GitHub Pages

1. **Enable GitHub Pages**:
   - Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `gh-pages`
   - Folder: `/ (root)`

2. **Repository permissions**: Ensure the workflow has write permissions
   - Settings → Actions → General → Workflow permissions
   - Enable "Read and write permissions"

## 🛠️ Local Development

### Testing GitHub Pages Locally

You can test your GitHub Pages examples locally before deploying:

```bash
# Quick test (build + serve once)
pnpm run dev-pages

# Development with auto-reload
pnpm run dev-pages:watch
```

**Features:**
- ✅ **Auto-rebuild**: Changes in `examples/` trigger automatic rebuild
- ✅ **Auto-reload**: Server restarts automatically after rebuild
- ✅ **Browser auto-open**: Opens your default browser automatically
- ✅ **Hot reload**: Edit files and see changes instantly

**Available URLs:**
- `http://localhost:3000/` - Home page
- `http://localhost:3000/react-demo/` - React example
- `http://localhost:3000/vanilla-demo/` - Vanilla JS example

### Setup GitHub Pages locally

```bash
# Setup gh-pages directory
pnpm run setup-gh-pages

# Serve locally (one-time)
pnpm run serve-gh-pages

# Development mode with auto-rebuild
pnpm run dev-pages

# Watch mode (auto-rebuild on changes)
pnpm run dev-pages:watch

# Deploy manually (requires gh-pages branch)
pnpm run deploy-pages
```

### Manual npm publishing

```bash
# Build production
pnpm run build:prod

# Update version
pnpm version patch  # or minor, major

# Publish
pnpm publish
```

## 📊 Workflow Status

Check workflow status in the **Actions** tab:

- ✅ **Green**: All checks passed
- ❌ **Red**: Tests or build failed
- 🟡 **Yellow**: Workflow in progress

## 🔧 Troubleshooting

### npm Publishing Issues

- **Authentication error**: Check `NPM_TOKEN` secret
- **Version conflict**: Ensure version doesn't already exist
- **Build failure**: Check linting and test errors

### GitHub Pages Issues

- **404 errors**: Check gh-pages branch exists and is configured
- **Build failure**: Check for syntax errors in examples
- **Permission denied**: Check repository permissions

### Common Commands

```bash
# Check workflow status
gh run list

# View workflow logs
gh run view <run-id>

# Rerun failed workflow
gh run rerun <run-id>
```

## 📚 Related Documentation

- [API Reference](./API.md)
- [Migration Guide](./MIGRATION.md)
- [Tips & Best Practices](./TIPS.md)
