#! /bin/bash

DIR="/home/vagrant/src"
LOG_DIR="/var/log/flashcube"
REPO="https://github.com/hostdp6/flashcube.git"
PROJECT="flashcube"

# create Python virtual environment
pip3 install virtualenvwrapper
export WORKON_HOME=/home/vagrant/.virtualenvs
export PROJECT_HOME=$DIR
export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3
export VIRTUALENVWRAPPER_VIRTUALENV=/usr/local/bin/virtualenv
source /usr/local/bin/virtualenvwrapper.sh

mkvirtualenv $PROJECT
workon $PROJECT

if ! [ -d "$DIR" ]; then
  mkdir $DIR
fi

if ! [ -d "$LOG_DIR" ]; then
  mkdir $LOG_DIR
fi

# setup ssh agent
eval "$(ssh-agent -s)"
ssh-add /home/vagrant/.ssh/id_rsa

# clone git repo
cd $DIR
git clone $REPO

# install python deps for API
cd $DIR/flashcube/flashcube
pip3 install -r requirements.txt

# Apply database migrations
echo "Applying database migrations"
python manage.py migrate

# Start server
echo "Starting server"
nohup python manage.py runserver 0.0.0.0:8000 >> /var/log/flashcube/django.log 2>&1 &