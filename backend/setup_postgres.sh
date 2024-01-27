#!/bin/bash

# create user
sudo -u postgres bash -c "psql -c \"CREATE USER request_bin WITH SUPERUSER PASSWORD 'password';\""

# create fresh database
sudo -u postgres psql dropdb request_bin
sudo -u postgres psql createdb request_bin

# create schema
sudo -u postgres psql -d request_bin < schema.sql