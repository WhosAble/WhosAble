defmodule WhosAble.Router do
  use WhosAble.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :authenticated do
    plug WhosAble.Auth
  end

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  scope "/api", WhosAble do
    pipe_through :api

    post "/signup", UserController, :create
    post "/login", LoginController, :login
  end

  scope "/", WhosAble do
    pipe_through :browser

    post "messages/receive", MessagesController, :receive
    get "*path", PageController, :load_page
  end
end
