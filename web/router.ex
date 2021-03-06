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

  scope "/", WhosAble do
    pipe_through :api

    scope "/api", nil do
      post "/signup", UserController, :create
      post "/login", LoginController, :login
    end

    post "/messages/receive", MessagesController, :receive
  end

  scope "/", WhosAble do
    pipe_through :browser

    get "/*path", PageController, :load_page
  end
end
