defmodule Api.Account do
  use Api.Web, :model

  schema "accounts" do
    has_many :users, Api.User
    has_many :locations, Api.Location

    timestamps
  end
end
