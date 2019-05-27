#!/usr/bin/env python3
import os
import pandas as pd
from sodapy import Socrata
import psycopg2.extras
import pandas.io.sql as pdsql
import datetime
import json
from S3api import S3api
# Print error messages in Ec2 instance for cronjobs ran
# cat /var/spool/mail/ec2-user
try:
    conn = pysco.connect(dbname=os.environ['NYC_DATA_DB'], port='5432', user=os.environ['NYC_DATA_USER'], host=os.environ['NYC_DATA_ENDPOINT'], password='{}'.format(os.environ['MASTER_PASSWORD']))
    # conn = psycopg2.connect(dbname=os.environ['NYC_DATA_DB'], port='5432', user=os.environ['NYC_DATA_USER'], host=os.environ['NYC_DATA_ENDPOINT'], password='{}'.format(os.environ['MASTER_PASSWORD']))
    print("Connection Established")

except (Exception, psycopg2.DatabaseError) as error:
    print("Unable to connect to the database")
    print(error)

cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

cur.execute("""select min(violation_id) from houses;""")
first = cur.fetchone()[0]
cur.execute("""select max(violation_id) from houses;""");
last = cur.fetchone()[0]
print(first, last)

# first = 11066297
# last =  11100000
min = first
max = first + 10000
list =[]

def loop(first, last, min, max, list):

    if min < last:
        cur.execute("""SELECT * FROM houses where violation_id between {0} and {1}""".format(min, max))
        rows = cur.fetchall()
        # print(rows)

        for row in rows:
            dict = {}
            for i,val in enumerate(row):
                if isinstance(val, datetime.datetime):
                    row[i] = row[i].__str__()
                dict[cur.description[i].name] = row[i]
            list.append(dict)

        min += 10000
        max += 10000
        print(min, max)
        return loop(first, last, min, max, list)

    else:
        # write to json file
        with open('data/data.json', 'w') as outfile:
            json.dump(list, outfile)

        api = S3api()
        api.download()


# def main():
#     # call functions
if __name__ == '__main__':
    loop(first, last, min, max, list)
#         csv = Tojson()
#         csv.main()
