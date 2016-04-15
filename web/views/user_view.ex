defmodule Api.UserView do
  use Api.Web, :view

  def render("create.json", %{changeset: changeset}) do
    errors = Enum.map(changeset.errors, fn {field, message} ->
      %{
        field: field,
        message: render_message(message)
      }
    end)

    %{
      status: "failure",
      errors: errors
    }
  end
  def render("create.json", %{user: user}) do
    %{
      status: "success",
      user_id: user.id
    }
  end
  def render("error.json", %{error: error}) do
    %{
      status: "failure",
      errors: [error]
    }
  end

  def render_message({message, values}) do
    Enum.reduce values, message, fn {k, v}, acc ->
      String.replace(acc, "%{#{k}}", to_string(v))
    end
  end
  def render_message(message), do: message
end
