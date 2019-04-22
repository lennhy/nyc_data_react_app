import boto3


# Let's use Amazon S3
s3 = boto3.resource('s3')
print(s3)


for bucket in s3.buckets.all():
    print(bucket.name)

# Upload a new file
try:
    data = open('data/data.json', 'rb')
    s3.Bucket('nycviolations').put_object(Key='data.json', Body=data)
    print("Successfully uploaded")
    break
except:
    print("Upload was not Successfull")
