![WhosAble Logo](https://raw.githubusercontent.com/WhosAble/WhosAble/master/web/static/assets/images/logo.png)
[![Circle CI](https://circleci.com/gh/WhosAble/WhosAble.svg?style=svg)](https://circleci.com/gh/WhosAble/WhosAble)
[![StackShare](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](http://stackshare.io/mahcloud/whosable)
# WhosAble

To start your Phoenix app:

  * Copy config/dev.sample.exs into config/dev.secret.exs and configure for your machine
  * Copy config/test.sample.exs into config/test.secret.exs and configure for your machine
  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `npm install`
  * Start Phoenix endpoint with `iex -S mix phoenix.server`

Now you can visit [`localhost:4001`](http://localhost:4001) from your browser.

## Architecture Overview

The front-end web app for the whosable.com site is compiled by [`Brunch`](http://brunch.io/).

The main front-end framework is [`React`](https://facebook.github.io/react/) javascript.

To lookup all javascript dependencies open the [`package.json file`](https://github.com/WhosAble/WhosAble/blob/master/package.json).

WhosAble uses [`lodash`](https://lodash.com/docs) for javascript helper methods and [`SASS`](http://sass-lang.com/) for css helper methods.

This API repository is written in [`Elixir`](http://elixir-lang.org/). There are many dependency hex packages.

* [`Phoenix`](http://www.phoenixframework.org/) is the framework 
* [`Postgres`](http://www.postgresql.org/) is the database utility
* [`Ecto`](https://github.com/elixir-lang/ecto) is our database query tool
* [`ComeOnIn`](https://github.com/elixircnx/comeonin) is a password hashing library
* [`ExMachina`](https://github.com/thoughtbot/ex_machina) builds objects for the test framework

This web site has only 2 REST based api endpoints. All other traffic goes through web sockets.

### Security

On login, a user is given a JWT token to authorize them to listen in on and push notifications to their own unique web socket channel. This channel is the primary means of communicating with the API.

### WhosAble Mobile Apps

The WhosAble site has a mobile version that is currently under construction. These mobile apps would be native iOS and Android apps that utilize their internal contact list and SMS tools.

## Ubuntu install

1) Install Erlang/Elixir
```sh
sudo apt-get update
sudo apt-get install build-essential
sudo apt-get install erlang-asn1 erlang-base erlang-crypto erlang-inets erlang-mnesia erlang-public-key erlang-runtime-tools erlang-solutions erlang-ssl erlang-syntax-tools
wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb && sudo dpkg -i erlang-solutions_1.0_all.deb
sudo apt-get install esl-erlang
sudo apt-get install elixir
sudo apt-get install esl-erlang
```
2) Install hex packages
```sh
mix deps.get
mix deps.compile exrm
```
3) Install gems
```sh
curl -sSL https://get.rvm.io | bash -s stable
source /etc/profile.d/rvm.sh
rvm install ruby-2.3
gem install bundler
bundle install
```
4) Install npm packages
```sh
sudo apt-get install npm
npm install -g npm@3.5.2
npm install
sudo node_modules/brunch/bin/brunch build --production
```


## DigitalOcean Elixir Starter install
1)Upgrade elixir packages
``` sh
sudo apt-get upgrade elixir
sudo apt-get install erlang-asn1 erlang-base erlang-crypto erlang-inets erlang-mnesia erlang-public-key erlang-runtime-tools erlang-solutions erlang-ssl erlang-syntax-tools erlang-dev
sudo apt-get update
sudo apt-get install erlang
sugo apt-get install git
```
2) Install gems
```sh
curl -sSL https://get.rvm.io | bash -s stable
source /etc/profile.d/rvm.sh
rvm install ruby-2.3
gem install sass
bundle install
```
3) Upgrade npm and node
``` sh
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
sudo ln -sf /usr/local/n/versions/node/<VERSION>/bin/node /usr/bin/node 
sudo npm install -g npm
sudo npm install -g npm
```
4) Create database credentials
``` sh
sudo -u postgres psql
```
``` postgres
CREATE USER whosable WITH PASSWORD 'password';
CREATE DATABASE whosable;
GRANT ALL PRIVILEGES ON DATABASE whosable to whosable;
```
5) Create a release
``` sh
sudo env MIX_ENV=prod mix phoenix.digest
sudo env MIX_ENV=prod mix release
```
