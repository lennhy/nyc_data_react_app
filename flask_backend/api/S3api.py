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
        # try:
        for f in glob.glob("data/*.json"):
            print(f)

            with open(f, "rb") as infile:
                # print(infile.read())
                # print("here------", type(infile))
                # print("baaaaaa_----------",type(json.loads(infile.read())))
                print("------", infile.read().decode("utf-8"))
                list.append(infile.read().decode("utf-8"))
        # print("here", list)

        with open("data/merged_data.json", "wb") as outfile:
            json.dump(list, outfile)
        #
        #         # data = open('data/data.json', 'rb')
        #         # print(data)
        #         # s3.Bucket('nycviolations').put_object(Key='data.json', Body=data)
        #         # print("Successfully uploaded")
        # except:
            # print("Upload was not Successfull")


        # try:
        #     s3.meta.client.download_file('nycviolations', 'data.json', 'data/data.json')
        #     print("Successfully downloaded")
        #     # Remove from linux server
        #     os.remove('data/data.json')
        # except:
        #     # print(client.download_file('nycviolations', 'data.json', 'data/data1.json'))
        #     print("Download was not Successfull")


    # with open('data.json', 'wb') as f:
    #     s3.download_fileobj('nycviolations', 'data1.json', f)

if __name__ == '__main__':
    api = S3api()
    api.download()
