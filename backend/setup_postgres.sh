#!/bin/bash

# create user
sudo -u postgres bash -c "psql -c \"CREATE USER request_bin WITH SUPERUSER PASSWORD 'password';\""

# create fresh database
sudo -u postgres dropdb --if-exists request_bin
sudo -u postgres createdb request_bin

# create schema
sudo -u postgres psql -d request_bin < schema.sql