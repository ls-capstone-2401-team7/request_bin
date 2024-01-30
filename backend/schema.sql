DROP TABLE IF EXISTS bins,
requests;

CREATE TABLE bins (
  id serial NOT NULL PRIMARY KEY,
  bin_path VARCHAR NOT NULL UNIQUE,
  created_at timestamp NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC')
);

CREATE TABLE requests (
  id serial NOT NULL PRIMARY KEY,
  mongo_id VARCHAR NOT NULL,
  bin_id int NOT NULL,
  received_at timestamp NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC'),
  http_method VARCHAR NOT NULL,
  http_path VARCHAR NOT NULL,
  FOREIGN KEY (bin_id) REFERENCES bins(id) ON DELETE CASCADE
);