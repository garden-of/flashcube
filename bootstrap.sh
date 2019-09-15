#! /bin/bash

DIR="/home/vagrant/src"
REPO="https://github.com/hostdp6/flashcube.git"
PROJECT="flashcube"

apt-get update
apt-get install git-core
apt-get install python3-pip

# create Python virtual environment
pip3 install virtualenvwrapper
export WORKON_HOME=$HOME/.virtualenvs
export PROJECT_HOME=$HOME/Devel
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

# install python deps for API
cd $DIR/flashcube/flashcube
pip3 install -r requirements.txt

# start the server
# Apply database migrations
echo "Applying database migrations"
python manage.py migrate

# Start server
echo "Starting server"
nohup python manage.py runserver &