#! /bin/bash

DIR="/home/vagrant/src"
LOG_DIR="/var/log/flashcube"
REPO="https://github.com/hostdp6/flashcube.git"
PROJECT="flashcube"

apt-get -y update
apt-get -y install git-core
apt-get -y install python3-pip
apt-get -y install postgresql postgresql-contrib libpq-dev