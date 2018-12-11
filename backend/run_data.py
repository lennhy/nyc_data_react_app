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
print (df)
try:
    conn = pysco.connect(dbname=os.environ['NYC_DATA_DB'], port='5432', user=os.environ['NYC_DATA_USER'], host=os.environ['NYC_DATA_ENDPOINT'], password='{}'.format(os.environ['MASTER_PASSWORD']))
    print("Connection Established")

except (Exception, pysco.DatabaseError) as error:
        print("Unable to connect to the database")
        print(error)

cur = conn.cursor()

cur.execute(
    """INSERT INTO houses(building_id, violation_id, boro, house_number, street_name, zip, apartment, inspection_date, approved_date, current_status, current_status_date, violation_status, original_certify_by_date, community_board)
    VALUES ('%d', '%d', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')""", (df['buildingid'].astype(int), df['violationid'], df['boro'], df['housenumber'], df['streetname'],df["zip"], df["apartment"], df["inspectiondate"],df["approveddate"],df["currentstatus"],df["currentstatusdate"],df["violationstatus"],df["originalcertifybydate"],df["communityboard"])
    )


cur.close()
