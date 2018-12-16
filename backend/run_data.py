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
results = client.get("b2iz-pps8", limit=20)
# print(results)
df = pd.DataFrame(results)
print("1st", df["housenumber"])
# print("2nd",df.loc["housenumber"])

try:
    conn = pysco.connect(dbname=os.environ['NYC_DATA_DB'], port='5432', user=os.environ['NYC_DATA_USER'], host=os.environ['NYC_DATA_ENDPOINT'], password='{}'.format(os.environ['MASTER_PASSWORD']))
    print("Connection Established")

except (Exception, pysco.DatabaseError) as error:
        print("Unable to connect to the database")
        print(error)

cur = conn.cursor()
# cur.close()
    # WHERE violation_id NOT IN (
     # SELECT houses.building_id
     # FROM houses WHERE houses.building_id = %s %(df['boro']));
for i, val in enumerate(df):
    # print(len(df.length))
    # if i < len(df.length):
        # print(i)
        # print(df[val][i])
    # print("Here sir ", i)
    # print("here ", i["housenumber"].values)
    cur.execute(
        """INSERT INTO houses(building_id, violation_id, boro, house_number, street_name, zip, apartment, inspection_date, approved_date, current_status, current_status_date, violation_status, original_certify_by_date, community_board)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""", (df['buildingid'][0], df['violationid'][0], df['boro'][0], df["housenumber"][0], df["streetname"][0],df["zip"][0], df["apartment"][0], df["inspectiondate"][0],df["approveddate"][0],df["currentstatus"][0],df["currentstatusdate"][0],df["violationstatus"][0],df["originalcertifybydate"][0],df["communityboard"][0])
    )

conn.commit()
cur.close()
conn.close
