defmodule WhosAble.Contact do
  use WhosAble.Web, :model

  schema "contacts" do
    field :first_name
    field :last_name
    field :email
    field :phone
    field :hourly_rate, :integer

    belongs_to :account, WhosAble.Account
    belongs_to :service, WhosAble.Service

    timestamps
  end

  ###
  ### CHANGESETS
  ###

  def changeset(model, params \\ %{}) do
    model
    |> cast(params, ~w(account_id), ~w(service_id first_name last_name email phone hourly_rate))
  end
end
