#!/usr/bin/env python3
import os
import pandas as pd
from sodapy import Socrata
import psycopg2.extras
import pandas.io.sql as pdsql
import datetime
import json


# psql --host=mypostgresql.c6c8mwvfdgv0.us-west-2.rds.amazonaws.com --port=5432 --username=awsuser --password --dbname=mypgdb
try:
    conn = psycopg2.connect(dbname=os.environ['NYC_DATA_DB'], port='5432', user=os.environ['NYC_DATA_USER'], host=os.environ['NYC_DATA_ENDPOINT'], password='{}'.format(os.environ['MASTER_PASSWORD']))
    print("Connection Established")

except (Exception, psycopg2.DatabaseError) as error:
    print("Unable to connect to the database")
    print(error)

cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)



# class Tojson(self):

    # def converttostring(val):
    #     if isinstance(val, datetime.datetime):
    #         val = val.__str__()
    #     if isinstance(val, int):
    #         val = str(val)
    #     else:
    #         val

cur.execute("""SELECT * FROM houses limit(10)""")
rows = cur.fetchall()
list =[]

for row in rows:
    dict = {}
    for i,val in enumerate(row):
        if isinstance(val, datetime.datetime):
            row[i] = row[i].__str__()
        dict[cur.description[i].name] = row[i]
    list.append(dict)

# write to json file
with open('data/data.json', 'w') as outfile:
    json.dump(list, outfile)


    # def main():
    #     # call functions
    #
    # if __name__ == '__main__':
    #     csv = Tojson()
    #     csv.main()
