# #!/usr/bin/env python3
# import os
# import pandas as pd
# from sodapy import Socrata
# import psycopg2 as pysco
# import pandas.io.sql as pdsql
# from psycopg2 import sql
#
# # Unauthenticated client only works with public data sets. Note 'None'
# # in place of application token, and no username or password:
# # client = Socrata("data.cityofnewyork.us", None)
#
# # Example authenticated client (needed for non-public datasets):
# client = Socrata("data.cityofnewyork.us",
#                  os.environ['NYC_DATA_APP_TOKEN'],
#                  username=os.environ['EMAIL_1'],
#                  password= os.environ['MASTER_PASSWORD'])
#
# # First 2000 results, returned as JSON from API / converted to Python list of
# # dictionaries by sodapy.
# results = client.get("b2iz-pps8", limit=20)
# df = pd.DataFrame(results)
# print(df)
# try:
#     conn = pysco.connect(dbname=os.environ['NYC_DATA_DB'], port='5432', user=os.environ['NYC_DATA_USER'], host=os.environ['NYC_DATA_ENDPOINT'], password='{}'.format(os.environ['MASTER_PASSWORD']))
#     print("Connection Established")
#
# except (Exception, pysco.DatabaseError) as error:
#         print("Unable to connect to the database")
#         print(error)
#
# cur = conn.cursor()
#
# for i, row in df.iterrows():
# # try:
#     print(i)
#     cur.execute(
#     """INSERT INTO houses(building_id, violation_id, boro, house_number, street_name, zip, apartment, inspection_date, approved_date, current_status, violation_status, original_certify_by_date, community_board)
#     VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
#     WHERE violation_id NOT IN ( SELECT houses.violation_id
#     FROM houses WHERE houses.violation_id = %s);""" % (df.loc[i, 'buildingid'], df.loc[i,'violationid'], df.loc[i,'boro'], df.loc[i,"housenumber"], df.loc[i,"streetname"], df.loc[i,"zip"], df.loc[i,"apartment"], df.loc[i,"inspectiondate"], df.loc[i,"approveddate"], df.loc[i, "currentstatus"],  df.loc[i, "violationstatus"], df.loc[i,"originalcertifybydate"], df.loc[i, "communityboard"], df.loc[i,'violationid'])
#     )
# # except:
# #     i > 19
#
# data = pdsql.read_sql_query("""select * from houses;""", conn)
# print(data)
#
# conn.commit()
# cur.close()
# conn.close()
#!/usr/bin/env python3
import os
import pandas as pd
from sodapy import Socrata
import psycopg2 as pysco
import pandas.io.sql as pdsql

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
df = pd.DataFrame(results)

try:
    conn = pysco.connect(dbname=os.environ['NYC_DATA_DB'], port='5432', user=os.environ['NYC_DATA_USER'], host=os.environ['NYC_DATA_ENDPOINT'], password='{}'.format(os.environ['MASTER_PASSWORD']))
    print("Connection Established")

except (Exception, pysco.DatabaseError) as error:
        print("Unable to connect to the database")
        print(error)

cur = conn.cursor()

for i, row in df.iterrows():
# for i, val in enumerate(df):
    cur.execute(
        """INSERT INTO houses(building_id, id, boro, house_number, street_name, zip, apartment, inspection_date, approved_date, current_status, current_status_date, violation_status, original_certify_by_date, community_board)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""", (df['buildingid'][i], df['violationid'][i], df['boro'][i], df["housenumber"][i], df["streetname"][i],df["zip"][i], df["apartment"][i], df["inspectiondate"][i],df["approveddate"][i],df["currentstatus"][i],df["currentstatusdate"][i],df["violationstatus"][i],df["originalcertifybydate"][i],df["communityboard"][i])
    )

data = pdsql.read_sql_query("""select * from houses;""", conn)
print(data)

conn.commit()
cur.close()
conn.close()
