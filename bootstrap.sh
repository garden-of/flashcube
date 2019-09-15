#! /bin/bash

apt-get update
apt-get install git-core

DIR="/home/vagrant/src"
REPO="https://github.com/hostdp6/flashcube.git"

if ! [ -d "$DIR" ]; then
  mkdir $DIR
fi

# clone git repo
cd $DIR
git clone $REPO

