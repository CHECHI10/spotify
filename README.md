<div align="center">
  <img src="frontend/public/soundSphere-icon.png" alt="SoundSphere logo" width="96" />

  # SoundSphere

  A full-stack music streaming platform for listeners and artists, built with React, Express, MongoDB, and ImageKit.

  [![Backend CI](https://github.com/CHECHI10/soundsphere/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/CHECHI10/soundsphere/actions/workflows/backend-ci.yml)
  [![Frontend CI](https://github.com/CHECHI10/soundsphere/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/CHECHI10/soundsphere/actions/workflows/frontend-ci.yml)
</div>

## Overview

SoundSphere is a Spotify-inspired music app that supports two real user journeys: listeners can browse, search, play, like, and organize music, while artists can upload tracks, create albums, and review upload history. The project is designed as a complete product slice rather than a static UI demo, with authentication, protected routes, persistent music data, upload storage, and CI checks.

The app demonstrates full-stack ownership across product design, frontend state management, REST API design, database modeling, media upload handling, and deployment-ready project structure.

## Demo And Screenshots

Live demo coming soon.

| Screen | Preview |
| --- | --- |
| Library | Screenshot coming soon |
| Player and queue | Screenshot coming soon |
| Artist dashboard | Screenshot coming soon |
| Playlist management | Screenshot coming soon |

## Core Features

- Secure account registration, login, logout, and session loading with JWT-based auth.
- Listener and artist roles with protected app areas and role-specific navigation.
- Music library with albums, tracks, artist links, search, and playback controls.
- Persistent audio player with queue management, previous/next controls, seeking, volume, and local player state.
- Liked songs and recently played history backed by MongoDB.
- User playlists with create, rename, delete, add/remove tracks, and drag-to-reorder behavior.
- Artist dashboard for uploading tracks, tracking upload progress, canceling uploads, creating albums, and viewing upload history.
- REST API validation, centralized error handling, and serialized API responses for clean frontend consumption.

## Tech Stack

| Layer | Tools |
| --- | --- |
| Frontend | React 18, Vite, React Router, Tailwind CSS, Axios, lucide-react |
| Backend | Node.js, Express 5, MongoDB, Mongoose, JWT, bcryptjs, multer |
| Media storage | ImageKit |
| Testing | Jest, Supertest, mongodb-memory-server |
| CI / Deployment | GitHub Actions, Vercel SPA rewrites |

## Architecture

SoundSphere is split into a `frontend` Vite app and a `backend` Express API.

- The frontend uses route-level pages, shared layout components, and React context providers for auth, notifications, user library data, and audio playback.
- API access is centralized in `frontend/src/api/client.js`, which normalizes request errors and supports upload progress/cancelation.
- The backend follows a route/controller/model structure with middleware for authentication, role checks, request validation, cookies, and CORS.
- MongoDB stores users, tracks, albums, playlists, liked songs, play history, and upload history through Mongoose models.
- Artist uploads are accepted with `multer` memory storage, sent to ImageKit, then persisted as playable music records.

## Project Structure

```text
soundsphere/
|-- backend/              # Express API, MongoDB models, tests, upload scripts
|-- frontend/             # React/Vite app, pages, components, contexts
|-- .github/workflows/    # Backend and frontend CI
`-- README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- MongoDB connection string
- ImageKit account credentials for artist uploads

### Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

Run the API:

```bash
npm run dev
```

The backend defaults to port `3000` if `PORT` is not set. The frontend defaults to `http://localhost:5000/api`, so using `PORT=5000` is the easiest local setup.

### Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env` if your API is not running on `http://localhost:5000/api`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the app:

```bash
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## Useful Commands

```bash
# Backend tests
cd backend
npm test

# Frontend production build
cd frontend
npm run build
```

During local verification, the backend auth test assertions passed with:

```bash
cd backend
npm test -- --forceExit
```

The plain `npm test` command may wait on an open async handle in some local environments, even after tests complete.

## Environment Variables

| App | Variable | Required | Purpose |
| --- | --- | --- | --- |
| Backend | `MONGO_URI` | Yes | MongoDB connection string |
| Backend | `JWT_SECRET` | Yes | Signs and verifies auth tokens |
| Backend | `IMAGEKIT_PUBLIC_KEY` | Yes | ImageKit public key for uploads |
| Backend | `IMAGEKIT_PRIVATE_KEY` | Yes | ImageKit private key for uploads |
| Backend | `IMAGEKIT_URL_ENDPOINT` | Yes | ImageKit delivery endpoint |
| Backend | `CLIENT_ORIGIN` | Optional | Allowed frontend origins for CORS |
| Backend | `PORT` | Optional | API port, recommended `5000` for local frontend defaults |
| Frontend | `VITE_API_URL` | Optional | API base URL, defaults to `http://localhost:5000/api` |

## What This Project Demonstrates

- Building a role-aware full-stack app with real listener and artist workflows.
- Designing reusable frontend state boundaries with React context and a centralized API client.
- Modeling product data in MongoDB with relationships between users, music, albums, playlists, likes, and play history.
- Handling media uploads with progress feedback, cancelation, upload history, and cloud storage.
- Shipping a project with CI, production build configuration, and deployment-friendly routing.

## Notes

- `assets/logo.png` is not referenced here because it is not currently tracked by Git.
- The frontend Vercel config rewrites all routes to `index.html` so React Router routes work after deployment.
