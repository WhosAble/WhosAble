defmodule Api.LocationController do
  use Api.Web, :controller

  def index(conn, _) do
    conn |> render("index.json")
  end
end
