defmodule Api.AccountSettingController do
  use Api.Web, :controller

  def show(conn, _) do
    conn |> render("show.json")
  end
end
