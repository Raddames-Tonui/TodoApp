#!/bin/sh

# Load environment variables from .env file
export $(grep -v '^#' .env | xargs)

# Wait for PostgreSQL to be ready
until pg_isready -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER"; do
    echo "Waiting for database..."
    sleep 2
done

echo "Database is ready!"

# Proceed with migration
if [ ! -d "migrations" ]; then
    echo "Initializing migrations..."
    flask db init || true
fi

flask db migrate -m "Initial migration" || true
flask db upgrade || true

echo "Database migration completed!"
