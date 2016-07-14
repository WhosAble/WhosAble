defmodule WhosAble.Address do
  use WhosAble.Web, :model

  schema "addresses" do
    field :address
    field :city
    field :state
    field :zip

    belongs_to :account, WhosAble.Account

    timestamps
  end

  ###
  ### CHANGESETS
  ###

  def changeset(model, params \\ %{}) do
    model
    |> cast(params, ~w(account_id address city state zip), [])
  end
end
