defmodule Api.UserController do
  use Api.Web, :controller

  alias Api.Account
  alias Api.User

  def create(conn, %{"user" => _}) do
    user_params = scrub_params(conn, "user").params["user"]

    conn
    |> create_account
    |> create_user(user_params)
    |> render("create.json")
  end
  def create(conn, _) do
    conn
    |> assign(:error, %{code: "invalid", message: "No user provided"})
    |> render("error.json")
  end

  ###
  ### PRIVATE
  ###

  defp create_account(conn) do
    case Repo.insert(Ecto.Changeset.change(%Account{}, %{})) do
      {:ok, account} -> conn |> assign(:account, account)
      {:error, _} -> conn
    end
  end

  defp create_user(%{assigns: %{account: account}} = conn, user_params) do
    changeset = User.changeset(%User{}, Map.merge(user_params, %{"account_id" => account.id}))

    case Repo.insert(changeset) do
      {:ok, user} -> conn |> assign(:user, user)
      {:error, changeset} ->
        Repo.delete(account)

        conn
        |> assign(:changeset, changeset)
    end
  end
  defp create_user(conn, _), do: conn
end