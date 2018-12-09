#!/usr/bin/env python3
import os
import pandas as pd
from sodapy import Socrata
import psycopg2 as pysco

# Unauthenticated client only works with public data sets. Note 'None'
# in place of application token, and no username or password:
# client = Socrata("data.cityofnewyork.us", None)

# Example authenticated client (needed for non-public datasets):
client = Socrata("data.cityofnewyork.us",
                 os.environ['NYC_DATA_APP_TOKEN'],
                 username=os.environ['EMAIL_1'],
                 password= os.environ['MASTER_PASSWORD'])

# First 2000 results, returned as JSON from API / converted to Python list of
# dictionaries by sodapy.
results = client.get("b2iz-pps8", limit=2)
df = pd.DataFrame(results)
print (df)
try:
    conn = pysco.connect(dbname=os.environ['NYC_DATA_DB'], port='5432', user=os.environ['NYC_DATA_USER'], host=os.environ['NYC_DATA_ENDPOINT'], password='{}'.format(os.environ['MASTER_PASSWORD']))
    print("Connection Established")

except (Exception, pysco.DatabaseError) as error:
        print("Unable to connect to the database")
        print(error)

cur = conn.cursor()
print(df["novtype"])
# for row in df.items():
#     print(row[1])

# for index, row in enumerate(df):
#     # if row == "lowhousenumber":
#     print(df[row])
    # print(row[0])
#     INSERT INTO table_name (column1, column2, column3, ...)
# VALUES (value1, value2, value3, ...);
    # if val == "building_id":
        # cur.execute("CREATE TEMP TABLE temp100(building_id);")
        # cur.execute("INSERT INTO temp100(building_id) VALUES (%s);"), (df["buildingid"])
    #     cur.execute("INSERT INTO temp100(building_id) VALUES (%s);"), str(val)
    #     record = cur.fetchall()
    #     print(record, "hello")
# def createquery(query):
# 	print(query)
# 	cur.execute(query)
# 	print 'status message', cur.statusmessage
# 	print 'description message',  cur.description
# 	conn.commit()

# cur.execute(
#     "CREATE TEMP TABLE temp100(
#      building_id INT PRIMARY KEY NOT NULL,
#      violation_id INT NOT NULL,
#      boro TEXT,
#      house_number TEXT,
#      street_name TEXT,
#      zip TEXT,
#      apartment TEXT,
#      inspection_date TIMESTAMP,
#      approved_date TIMESTAMP,
#      current_status TEXT,
#      current_status_date TIMESTAMP,
#      violation_status_date TIMESTAMP,
#      violation_status TEXT,
#      original_certify_by_date TIMESTAMP,
#      community_board TEXT
#     );"
# )
# cur.execute(
#     """INSERT INTO houses(building_id, violation_id, boro, house_number, street_name, zip, apartment, inspection_date, approved_date, current_status, current_status_date, violation_status_date, violation_status, original_certify_by_date, community_board)
#     VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s') WHERE violation_id NOT IN (
#      SELECT houses.building_id
#      FROM houses WHERE houses.building_id = '%s');""" %(df['buildingid'], df['violationid'], df['boro'], df["housenumber"], df["streetname"],df["zip"],df["apartment"],NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL)
#
# )
# (building_id, violation_id, boro, house_number)

cur.close()
# cur.execute('SELECT * FROM notes')
# one = cur.fetchone()
# all = cur.fetchall()


# CREATE TABLE houses(
#   building_id INT PRIMARY KEY NOT NULL,
#   violation_id INT NOT NULL,
#   boro TEXT,
#   house_number TEXT,
#   street_name TEXT,
#   zip TEXT,
#   APARTMENT TEXT,
#   inspection_date TIMESTAMP,
#   approved_date TIMESTAMP,
#   current_status TEXT,
#   current_status_date TIMESTAMP,
#   violation_status_date TIMESTAMP,
#   violation_status TEXT,
#   original_certify_by_date TIMESTAMP
# );
