#! /bin/bash

DIR="/home/vagrant/src"
REPO="https://github.com/hostdp6/flashcube.git"
PROJECT="flashcube"

apt-get -y update
apt-get -y install git-core
apt-get -y install python3-pip
apt-get -y install postgresql postgresql-contrib libpq-dev

# create Python virtual environment
pip3 install virtualenvwrapper
export WORKON_HOME=$HOME/.virtualenvs
export PROJECT_HOME=$HOME/Devel
export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3
export VIRTUALENVWRAPPER_VIRTUALENV=/usr/local/bin/virtualenv
source /usr/local/bin/virtualenvwrapper.sh

mkvirtualenv $PROJECT
workon $PROJECT

if ! [ -d "$DIR" ]; then
  mkdir $DIR
fi

# setup ssh agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa

# clone git repo
cd $DIR
git clone $REPO

# create pg database for django
su - postgres
psql -c "CREATE DATABASE $PROJECT;"
psql -c "CREATE USER $PROJECT WITH PASSWORD '$PROJECT';"
psql -c "ALTER ROLE $PROJECT SET client_encoding TO 'utf8';"
psql -c "ALTER ROLE $PROJECT SET default_transaction_isolation TO 'read committed';"
psql -c "ALTER ROLE $PROJECT SET timezone TO 'UTC';"
psql -c "GRANT ALL PRIVILEGES ON DATABASE $PROJECT TO $PROJECT;"
exit

# install python deps for API
cd $DIR/flashcube/flashcube
pip3 install -r requirements.txt

# Apply database migrations
echo "Applying database migrations"
python manage.py migrate

# Start server
echo "Starting server"
nohup python manage.py runserver &