defmodule Api.LocationView do
  use Api.Web, :view

  def render("index.json", _) do
    %{
      locations: []
    }
  end
end
