defmodule WhosAble.Account do
  use WhosAble.Web, :model

  schema "accounts" do
    has_many :users, WhosAble.User
    has_many :addresses, WhosAble.Address

    timestamps
  end
end
