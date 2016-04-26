defmodule WhosAble.PageController do
  use WhosAble.Web, :controller

  def load_page(conn, _) do
    render conn, "index.html"
  end
end