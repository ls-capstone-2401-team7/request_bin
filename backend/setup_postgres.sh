#!/bin/bash

# Make sure to give file executable privileges. Can suppress errors with 2>/dev/null as well
# Command to give executable priviledges:   chmod +x setup_postgres.sh
# Command to run script:                    ./setup_postgres.sh 2>/dev/null

# create user
sudo -u postgres bash -c "psql -c \"CREATE USER request_bin WITH SUPERUSER PASSWORD 'password';\""
# create fresh database
sudo -u postgres dropdb --if-exists request_bin
sudo -u postgres createdb request_bin

# create schema
psql request_bin < schema.sql