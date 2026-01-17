#!/usr/bin/env bash
# Exit on error
set -o errexit

# Modify this line as needed for your package manager (pip, poetry, etc.)
cd backend
pip install -r requirements.txt

# Convert static asset files (--clear to avoid S3 404 errors on missing files)
python manage.py collectstatic --no-input --clear

# Apply any outstanding database migrations
python manage.py migrate

#python manage.py createsuperuser --noinput --username zim-rec --email simbamtombe@gmail.com 