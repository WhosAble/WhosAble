![RocketNanny Logo](https://cloud.githubusercontent.com/assets/1529103/14503871/327e377e-016f-11e6-915b-e015aeaa5184.png)
[![Circle CI](https://circleci.com/gh/RocketNanny/API.svg?style=svg)](https://circleci.com/gh/RocketNanny/API)

# Api

To start your Phoenix app:

  * Copy config/dev.sample.exs into config/dev.secret.exs and configure for your machine
  * Copy config/test.sample.exs into config/test.secret.exs and configure for your machine
  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `npm install`
  * Start Phoenix endpoint with `iex -S mix phoenix.server`

Now you can visit [`localhost:4001`](http://localhost:4001) from your browser.

## Architecture Overview

This API repository is written in [`Elixir`](http://elixir-lang.org/). There are many dependency hex packages.

* [`Phoenix`](http://www.phoenixframework.org/) is the framework 
* [`Postgres`](http://www.postgresql.org/) is the database utility
* [`Ecto`](https://github.com/elixir-lang/ecto) is our database query tool
* [`ComeOnIn`](https://github.com/elixircnx/comeonin) is a password hashing library
* [`ExMachina`](https://github.com/thoughtbot/ex_machina) builds objects for the test framework
* [`PlugCors`](https://github.com/bryanjos/plug_cors) manages HTTP access control to the api from 3rd party front-ends

This web site has no HTML pages and only 2 REST based endpoints. All other traffic goes through web sockets.

### Security

On login, a user is given a JWT token to authorize them to listen in on and push notifications to their own unique web socket channel. This channel is the primary means of communicating with the API.
