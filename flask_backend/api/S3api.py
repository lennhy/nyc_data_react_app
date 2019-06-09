import boto3
import os
import glob
import json

# Let's use Amazon S3
s3 = boto3.resource('s3')
print(s3)


class S3api:
    def __init__(self):
        print("Here", self)


    def download(self):
        list =[]
        for bucket in s3.buckets.all():
            print("Bucket Name: ", bucket.name)


        # Upload a new file
        try:

            for f in glob.glob(os.path.abspath("data/*")):
                with open(f, "rb") as infile:
                    try:
                        # Decode bytes object to a json string
                        list.append(json.loads((infile.read()).decode("utf-8")))
                    except Exception:
                        print(Exception)

            with open("data/merged_data.json", "w") as outfile:
                json.dump(list, outfile)

                data = open('data/merged_data.json', 'rb')
                print("data ", data)
                s3.Bucket('nycviolations').put_object(Key='merged_data.json', Body=data)
                print("Successfully uploaded")
        except Exception as e:
            print(Exception, "Upload was not Successfull")


        # try:
        #     s3.meta.client.download_file('nycviolations', 'merged_data.json', 'merged_data.json')
        #     print("Successfully downloaded")
        #     # Remove from linux server
        #     os.remove('data/*.json')
        # except IOError:
        #     # print(client.download_file('nycviolations', 'data.json', 'data/data1.json'))
        #     print(IOError, "Download was not Successfull")


    # with open('data.json', 'wb') as f:
        # s3.download_fileobj('nycviolations', 'data1.json', f)

if __name__ == '__main__':
    api = S3api()
    api.download()
