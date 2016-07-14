#!/bin/bash

apt update && apt upgrade -y
apt install tmux git-core vim unzip npm python-setuptools python-dev build-essential -y
update-alternatives --set editor /usr/bin/vim.basic

apt install nginx -y

sudo apt install autoconf m4 libncurses5-dev -y
sudo apt install libwxgtk3.0-dev libgl1-mesa-dev libglu1-mesa-dev libpng3 -y
sudo apt install libssh-dev -y
sudo apt install unixodbc-dev -y