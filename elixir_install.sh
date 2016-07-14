#!/bin/bash

git clone https://github.com/asdf-vm/asdf.git ~/.asdf
echo '. $HOME/.asdf/asdf.sh' >> ~/.profile
echo '. $HOME/.asdf/completions/asdf.bash' >> ~/.profile
source ~/.profile

asdf plugin-add erlang https://github.com/asdf-vm/asdf-erlang.git
asdf plugin-add elixir https://github.com/asdf-vm/asdf-elixir.git
asdf install erlang 19.0
asdf global erlang 19.0
asdf install elixir 1.3.1
asdf global elixir 1.3.1
mix local.hex -y
mix local.rebar -y
