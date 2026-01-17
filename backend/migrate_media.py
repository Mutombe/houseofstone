#!/usr/bin/env python
"""
Script to migrate local media files to DigitalOcean Spaces
"""
import os
import boto3
from pathlib import Path

# DigitalOcean Spaces credentials
session = boto3.session.Session()
client = session.client(
    's3',
    region_name='sgp1',
    endpoint_url='https://sgp1.digitaloceanspaces.com',
    aws_access_key_id='DO00Y7P86G72BG7NLX3X',
    aws_secret_access_key='7SDVxpTVCyglkO0UknCsR2MO7lH7wVvozKgJOsU4o5Q'
)

BUCKET = 'hspmedia'
MEDIA_ROOT = Path(__file__).resolve().parent / 'media'

# Content type mapping
CONTENT_TYPES = {
    '.webp': 'image/webp',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
}

def migrate_media():
    uploaded = 0
    skipped = 0
    errors = 0

    print('Starting media migration to DigitalOcean Spaces...')
    print(f'Source: {MEDIA_ROOT}')
    print(f'Destination: {BUCKET}/media/')
    print('-' * 50)

    for file_path in MEDIA_ROOT.rglob('*'):
        if file_path.is_file():
            # Get relative path from media root
            relative_path = file_path.relative_to(MEDIA_ROOT)
            s3_key = 'media/' + str(relative_path).replace('\\', '/')

            # Get content type
            ext = file_path.suffix.lower()
            content_type = CONTENT_TYPES.get(ext, 'application/octet-stream')

            try:
                # Check if file already exists
                try:
                    client.head_object(Bucket=BUCKET, Key=s3_key)
                    skipped += 1
                    if skipped % 50 == 0:
                        print(f'Skipped {skipped} existing files...')
                    continue
                except:
                    pass  # File doesn't exist, upload it

                # Upload file
                with open(file_path, 'rb') as f:
                    client.put_object(
                        Bucket=BUCKET,
                        Key=s3_key,
                        Body=f,
                        ACL='public-read',
                        ContentType=content_type,
                        CacheControl='max-age=86400'
                    )
                uploaded += 1
                if uploaded % 20 == 0:
                    print(f'Uploaded {uploaded} files...')
            except Exception as e:
                errors += 1
                print(f'Error uploading {relative_path}: {e}')

    print('-' * 50)
    print(f'Migration complete!')
    print(f'Uploaded: {uploaded}')
    print(f'Skipped (already exists): {skipped}')
    print(f'Errors: {errors}')

if __name__ == '__main__':
    migrate_media()
