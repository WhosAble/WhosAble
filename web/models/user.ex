defmodule Api.User do
  use Api.Web, :model

  schema "users" do
    field :email
    field :password, :string, virtual: true
    field :password_hash
    field :token_hash
    field :last_login, Ecto.DateTime

    field :first_name
    field :last_name

    belongs_to :account, Api.Account

    timestamps
  end

  ###
  ### CHANGESETS
  ###

  def changeset(model, params \\ :empty) do
    model
    |> cast(params, ~w(account_id first_name last_name email password), [])
    |> validate_format(:email, ~r/\A[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\Z/)
    |> unique_constraint(:email)
    |> validate_length(:password, min: 8, max: 100)
    |> put_pass_hash
  end

  ###
  ### PRIVATE
  ###

  defp put_pass_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(changeset, :password_hash, Comeonin.Bcrypt.hashpwsalt(password))
      _ ->
        changeset
    end
  end
end
