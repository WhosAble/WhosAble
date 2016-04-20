defmodule Api.LoginView do
  use Api.Web, :view

  def render("login.json", %{user: user, account: account, token: token}) do
    %{
      status: "success",
      user_id: user.id,
      account_id: account.id,
      token: token
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
