CREATE TABLE houses(
  violation_id INT PRIMARY KEY NOT NULL,
  building_id INT NOT NULL,
  boro TEXT,
  house_number TEXT,
  street_name TEXT,
  zip TEXT,
  APARTMENT TEXT,
  inspection_date TIMESTAMP,
  approved_date TIMESTAMP,
  current_status TEXT,
  current_status_date TIMESTAMP,
  violation_status_date TIMESTAMP,
  violation_status TEXT,
  original_certify_by_date TIMESTAMP
);

-- Firstly, remove PRIMARY KEY attribute of former PRIMARY KEY
ALTER TABLE <table_name> DROP CONSTRAINT <table_name>_pkey;
-- Then change column name of  your PRIMARY KEY and PRIMARY KEY candidates properly.
ALTER TABLE <table_name> RENAME COLUMN <primary_key_candidate> TO id;
-- Lastly set your new PRIMARY KEY
ALTER TABLE <table_name> ADD PRIMARY KEY (id);


apartment             approveddate         bbl      bin block      boro boroid  ...   registrationid           story streetcode           streetname violationid violationstatus    zip
0       NaN  2013-10-09T00:00:00.000  3046740064  3102071  4674  BROOKLYN      3  ...           301467               2      36930       EAST 48 STREET    10000009           Close  11203
1       NaN  2013-10-15T00:00:00.000  2040040009  2042428  4004     BRONX      2  ...           226626             NaN      29620  EAST TREMONT AVENUE    10000011           Close  10460
2        3L  2013-10-10T00:00:00.000  2024820030  2002971  2482     BRONX      2  ...           211704               3      35020        GERARD AVENUE    10000012           Close  10451
3       NaN  2013-10-10T00:00:00.000  3046050019  3099672  4605  BROOKLYN      3  ...           350942  Yards / Courts      37080       EAST 52 STREET    10000014           Close  11203
4       NaN  2013-10-10T00:00:00.000  3046210021  3100214  4621  BROOKLYN      3  ...           300713  Yards / Courts      37080       EAST 52 STREET    10000017           Close  11203
5       NaN  2013-10-10T00:00:00.000  3046390040  3100912  4639  BROOKLYN      3  ...           314037  Yards / Courts      37080       EAST 52 STREET    10000019           Close  11203
6       NaN  2013-10-09T00:00:00.000  3046740064  3102071  4674  BROOKLYN      3  ...           301467               1      36930       EAST 48 STREET    10000022           Close  11203
7       NaN  2013-10-15T00:00:00.000  2040290004  2042905  4029     BRONX      2  ...           220733             NaN      52220   MORRIS PARK AVENUE    10000024           Close  10460
8       NaN  2013-10-15T00:00:00.000  2040110035  2042501  4011     BRONX      2  ...           210701             NaN      52220   MORRIS PARK AVENUE    10000026           Close  10460
9       NaN  2013-10-10T00:00:00.000  3047000003  3102928  4700  BROOKLYN      3  ...           325404  Yards / Courts      26230        CHURCH AVENUE    10000029           Close  11203
