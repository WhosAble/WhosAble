defmodule WhosAble.Service do
  use WhosAble.Web, :model

  schema "services" do
    field :name

    belongs_to :account, WhosAble.Account

    timestamps
  end

  ###
  ### CHANGESETS
  ###

  def changeset(model, params \\ %{}) do
    model
    |> cast(params, ~w(account_id name), [])
    |> unique_constraint(:name)
  end
end
