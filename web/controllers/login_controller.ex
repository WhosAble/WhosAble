defmodule WhosAble.LoginController do
  use WhosAble.Web, :controller
  import Comeonin.Bcrypt, only: [checkpw: 2]

  alias WhosAble.User

  def login(conn, %{"email" => _, "password" => _}) do
    email = scrub_params(conn, "email").params["email"] || ""
    password = scrub_params(conn, "password").params["password"] || ""

    conn
    |> check_password(email, password)
    |> assign_account
    |> assign_token
    |> render("login.json")
  end
  def login(conn, _) do
    conn
    |> assign(:error, %{code: "invalid", message: "Email and password are required fields"})
    |> render("error.json")
  end

  ###
  ### PRIVATE
  ###

  defp assign_account(%{assigns: %{user: user}} = conn) do
    conn |> assign(:account, Repo.get(WhosAble.Account, user.account_id))
  end
  defp assign_account(conn), do: conn

  defp check_password(conn, email, password) do
    user = Repo.get_by(User, email: email)

    cond do
      user && checkpw(password, user.password_hash) -> conn |> assign(:user, user)
      true -> conn
    end
  end

  defp assign_token(%{assigns: %{account: account, user: user}} = conn) do
    conn |> assign(:token, Phoenix.Token.sign(conn, "account socket", %{account_id: account.id, user_id: user.id}))
  end
  defp assign_token(conn), do: conn
end
