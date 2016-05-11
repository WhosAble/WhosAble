defmodule WhosAble.Job do
  use WhosAble.Web, :model

  schema "jobs" do
    field :start, Ecto.DateTime
    field :end, Ecto.DateTime
    field :notes

    belongs_to :account, WhosAble.Account
    belongs_to :address, WhosAble.Address
    belongs_to :service, WhosAble.Service
    belongs_to :user, WhosAble.User

    timestamps
  end

  ###
  ### CHANGESETS
  ###

  def changeset(model, params \\ :empty) do
    model
    |> cast(params, ~w(account_id user_id service_id address_id start end), [])
  end
end
