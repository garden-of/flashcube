#! /bin/bash

DIR="/home/vagrant/src"
LOG_DIR="/var/log/flashcube"
REPO="https://github.com/hostdp6/flashcube.git"
PROJECT="flashcube"

apt-get -y update
apt-get -y install git-core
apt-get -y install python3-pip
apt-get -y install postgresql postgresql-contrib libpq-dev

# create pg database for django
su postgres -c "psql -c \"CREATE DATABASE $PROJECT;\""
su postgres -c "psql -c \"CREATE USER $PROJECT WITH PASSWORD '$PROJECT';\""
su postgres -c "psql -c \"ALTER ROLE $PROJECT SET client_encoding TO 'utf8';\""
su postgres -c "psql -c \"ALTER ROLE $PROJECT SET default_transaction_isolation TO 'read committed';\""
su postgres -c "psql -c \"ALTER ROLE $PROJECT SET timezone TO 'UTC';\""
su postgres -c "psql -c \"GRANT ALL PRIVILEGES ON DATABASE $PROJECT TO $PROJECT;\""