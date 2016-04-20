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

  ###
  ### CHANGESETS
  ###

  def changeset(model, params \\ :empty) do
    model
    |> cast(params, ~w(account_id name address city state zip), [])
    |> validate_state
    |> validate_zip
  end

  def update_changeset(model, params \\ :empty) do
    model
    |> cast(params, ~w(name address city state zip), [])
    |> validate_state
    |> validate_zip
  end

  ###
  ### PRIVATE
  ###

  defp validate_state(changeset) do
    changeset |> validate_format(:state, ~r/^[A-Z]{2}$/, message: "must be a valid state abbr")
  end

  defp validate_zip(changeset) do
    changeset |> validate_format(:zip, ~r/\A\d{5}(?:[-\s]\d{4})?\Z/, message: "must be a 5 digit number like 84062")
  end
end
