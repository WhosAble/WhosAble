defmodule Api.Account do
  use Api.Web, :model

  schema "accounts" do
    has_many :users, Api.User

    timestamps
  end
end
