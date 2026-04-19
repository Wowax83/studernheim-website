# Project Documentation: Studernheim Website

## Overview
This project is a website for "Studernheim", built using modern web technologies. It is hosted and managed within the OpenClaw workspace ecosystem.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Content Management:** Sanity.io
- **Database/ORM:** Prisma
- **Infrastructure:** Docker, Docker Compose

## Key Project Components
- `app/`: Contains the core application logic and routes.
- \code components/`: Reusable UI components.
- `sanity/`: Configuration for Sanity CMS integration.
- `prisma/`: Database schema and client definitions.
- `public/`: Static assets.

## Development & Deployment
The project is containerized using Docker, allowing for consistent environments across development and production.

### Running with Docker
To start the application, use:
```bash
docker-compose up -d
```

## Configuration
Environment variables are managed via `.env` files. Ensure all necessary keys (like GitHub tokens or API endpoints) are correctly configured before deployment.
