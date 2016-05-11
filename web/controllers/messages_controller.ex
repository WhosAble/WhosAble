defmodule WhosAble.MessagesController do
  use WhosAble.Web, :controller

  def receive(conn, params) do
    IO.inspect params
    conn |> render("show.json")
  end
end