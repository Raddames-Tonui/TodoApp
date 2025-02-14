# Docker Setup

## Prerequisites
Ensure you have the following installed:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Services Configuration

### Database (PostgreSQL)
- Uses PostgreSQL 15 as the database.
- Loads environment variables from `./backend/.env`.
- Exposes port `5432` for local access.
- Persists data in a volume (`postgres_data`).

### Backend (Flask API)
- Built from the `./backend` directory.
- Exposes port `5000`.
- Includes a health check endpoint (`/health`).
- Uses `flask run --reload` for live-reloading in development.
- Stores uploaded files in the `uploads_data` volume.

### Frontend
- Built from the `./frontend` directory.
- Serves content on port `8000`.
- Depends on the backend being healthy before starting.

### Migrate (Flask-Migrate)
- Runs database migrations using Flask-Migrate.
- Ensures migrations are applied before the application runs.
- Runs only once per deployment.

## Running the Application
To start all services, run:
```sh
docker-compose up -d --build
```
This command builds the images (if necessary) and starts all services in detached mode (`-d`).

To check logs:
```sh
docker-compose logs -f
```
To stop the services:
```sh
docker-compose down
```

## Building and Pushing Docker Images
If you need to push images to a container registry (e.g., Docker Hub or GCP Artifact Registry):

### Step 1: Build the Images
```sh
docker build -t your-dockerhub-username/todo-backend:latest ./backend
```
```sh
docker build -t your-dockerhub-username/todo-frontend:latest ./frontend
```

### Step 2: Authenticate with the Registry
For Docker Hub:
```sh
docker login
```
For Google Artifact Registry:
```sh
gcloud auth configure-docker
```

### Step 3: Push the Images
```sh
docker push your-dockerhub-username/todo-backend:latest
```
```sh
docker push your-dockerhub-username/todo-frontend:latest
```

### Step 4: Deploy Using Pulled Images
On the server, pull the images and restart the containers:
```sh
docker-compose pull && docker-compose up -d
```

## Volumes
The application uses Docker volumes to persist data:
- `postgres_data`: Stores PostgreSQL database files.
- `uploads_data`: Stores uploaded files.

## Notes
- The backend waits for the database to be healthy before starting.
- The migration service runs once and exits to ensure database migrations are applied before the app starts.
- Modify the `command` in the backend service for production (e.g., use `gunicorn`).

