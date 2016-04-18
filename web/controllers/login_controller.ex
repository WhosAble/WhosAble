defmodule Api.LoginController do
  use Api.Web, :controller
  import Comeonin.Bcrypt, only: [checkpw: 2]

  alias Api.User

  def login(conn, %{"email" => _, "password" => _}) do
    email = scrub_params(conn, "email").params["email"] || ""
    password = scrub_params(conn, "password").params["password"] || ""

    conn
    |> check_password(email, password)
    |> assign_login_token
    |> render("login.json")
  end
  def login(conn, _) do
    conn
    |> assign(:error, %{code: "invalid", message: "Email and password are required fields"})
    |> render("error.json")
  end

  defp check_password(conn, email, password) do
    user = Repo.get_by(User, email: email)

    cond do
      user && checkpw(password, user.password_hash) -> conn |> assign(:user, user)
      true -> conn
    end
  end

  defp assign_login_token(%{assigns: %{user: user}} = conn) do
    token = generate_token

    case Repo.update(Ecto.Changeset.change(user, %{token_hash: hash_token(token), last_login: Ecto.DateTime.utc})) do
      {:ok, _} -> conn |> assign(:token, token)
      _ -> conn
    end
  end
  defp assign_login_token(conn), do: conn

  defp generate_token, do: :crypto.strong_rand_bytes(64) |> Base.url_encode64 |> binary_part(0, 64)

  defp hash_token(token), do: Comeonin.Bcrypt.hashpwsalt(token)
end
