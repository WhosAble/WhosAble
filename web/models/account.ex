defmodule WhosAble.Account do
  use WhosAble.Web, :model

  schema "accounts" do
    has_many :users, WhosAble.User
    has_many :locations, WhosAble.Location

    timestamps
  end
end
