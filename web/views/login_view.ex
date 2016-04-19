defmodule Api.LoginView do
  use Api.Web, :view

  def render("login.json", %{user: user, token: token, jwt: jwt}) do
    %{
      status: "success",
      user_id: user.id,
      token: token,
      jwt: jwt
    }
  end
  def render("login.json", _) do
    %{
      status: "failure",
      errors: [
        %{
          code: "failed",
          message: "Failed to authenticate!"
        }
      ]
    }
  end
  def render("error.json", %{error: error}) do
    %{
      status: "failure",
      errors: [error]
    }
  end
end
