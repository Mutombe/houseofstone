import boto3

# Initialize the S3 client
s3 = boto3.client(
    's3',
    endpoint_url='https://cellar-c2.services.clever-cloud.com',
    aws_access_key_id='Y8RA26DFTZA0AZDY2GR5',
    aws_secret_access_key='0ZCeRndoyvHbJy46GS9G2ZCgJluJDH1KhbNeDwS6',
)

# Open the file properly
file_path = "C:/Users/PC/Documents/houseofstone/backend/media/property_images/about.png"
with open(file_path, 'rb') as file:
    s3.upload_fileobj(file, 'hsp1', 'media/property_images/about.png')
print("File uploaded successfully.")

