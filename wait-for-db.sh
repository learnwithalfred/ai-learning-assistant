#!/bin/sh
set -e

host="$1"
shift

echo "Waiting for database at $host..."

until nc -z "$host" 5432; do
  sleep 1
done

echo "Database is ready!"

exec "$@"