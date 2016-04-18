defmodule Api.Location do
  use Api.Web, :model

  schema "locations" do
    field :name
    field :address
    field :city
    field :state
    field :zip

    belongs_to :account, Api.Account

    timestamps
  end
end
