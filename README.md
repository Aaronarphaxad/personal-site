# Modern minimalist website

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/aaronarphaxads-projects/v0-modern-minimalist-website)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/nrGhDSwBDWl)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**[https://vercel.com/aaronarphaxads-projects/v0-modern-minimalist-website](https://vercel.com/aaronarphaxads-projects/v0-modern-minimalist-website)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/nrGhDSwBDWl](https://v0.dev/chat/projects/nrGhDSwBDWl)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Environment variables (Sanity)

Create a `.env.local` file in the project root with your Sanity details:

```
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_VERSION=2025-05-01
# Optional for private datasets / preview
# SANITY_READ_TOKEN=your_read_token
```

Notes:
- `SANITY_PROJECT_ID` is required. Find it in the Sanity project settings at `manage.sanity.io`.
- `SANITY_DATASET` defaults to `production` if omitted.
- `SANITY_API_VERSION` must match the version used in `lib/sanity/env.ts`.
- Restart the dev server after adding env vars: `npm run dev`.
