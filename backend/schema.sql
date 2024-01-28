DROP TABLE IF EXISTS bins,
requests;

CREATE TABLE bins (
  id serial NOT NULL PRIMARY KEY,
  bin_path VARCHAR NOT NULL,
  created_at timestamp without time zone default (now() at time zone 'utc')
);

CREATE TABLE requests (
  id serial NOT NULL PRIMARY KEY,
  mongo_id VARCHAR NOT NULL,
  bin_id int NOT NULL,
  received_at timestamp without time zone default (now() at time zone 'utc'),
  http_method VARCHAR NOT NULL,
  http_path VARCHAR NOT NULL,
  FOREIGN KEY (bin_id) REFERENCES bins(id) ON DELETE CASCADE
);