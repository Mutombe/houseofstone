#!/usr/bin/env bash
# Exit on error
set -o errexit

# Modify this line as needed for your package manager (pip, poetry, etc.)
cd backend
pip install -r requirements.txt

# Convert static asset files (allow failure so deploy isn't blocked)
python manage.py collectstatic --no-input --clear || echo "collectstatic failed, continuing..."

# Apply any outstanding database migrations
python manage.py migrate
