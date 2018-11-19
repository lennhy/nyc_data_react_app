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
results = client.get("b2iz-pps8", limit=10)

# Convert to pandas DataFrame
results_df = pd.DataFrame.from_records(results)
print(results_df.buildingid)

try:
    conn = pysco.connect(dbname=os.environ['NYC_DATA_DB'], port='5432', user=os.environ['NYC_DATA_USER'], host=os.environ['NYC_DATA_ENDPOINT'], password='{}'.format(os.environ['MASTER_PASSWORD']))
    print("Connection Established")

except (Exception, pysco.DatabaseError) as error:
        print("Unable to connect to the database")
        print(error)

cur = conn.cursor()

for val in results_df:
#     INSERT INTO table_name (column1, column2, column3, ...)
# VALUES (value1, value2, value3, ...);
    query = """
    		INSERT INTO #nyc_1000 (val.buildingid, val.violationid, val., val., val., val., val., val., val., val., val., val., val., val., val.)
            VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')
            """
            
cur.execute(query)

# def createquery(query):
# 	print(query)
# 	cur.execute(query)
# 	print 'status message', cur.statusmessage
# 	print 'description message',  cur.description
# 	conn.commit()




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
