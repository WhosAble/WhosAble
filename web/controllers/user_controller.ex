defmodule Api.UserController do
  use Api.Web, :controller

  alias Api.User

  def create(conn, %{"user" => _}) do
    user_params = scrub_params(conn, "user").params["user"]
    changeset = User.changeset(%User{}, user_params)

    case Repo.insert(changeset) do
      {:ok, user} ->
        conn
        |> assign(:user, user)
        |> render("create.json")
      {:error, changeset} ->
        conn
        |> assign(:changeset, changeset)
        |> render("create.json")
    end
  end
  def create(conn, _) do
    conn
    |> assign(:error, %{code: "invalid", message: "No user provided"})
    |> render("error.json")
  end
end