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

    scope "/", nil do
      pipe_through :authenticated

#       get "/account/settings", AccountSettingController, :show

#       post "/location", LocationController, :create
#       put "/location/:location_id", LocationController, :update
#       delete "/location/:location_id", LocationController, :destroy
    end
  end

  scope "/", WhosAble do
    pipe_through :browser

    get "/", PageController, :load_page
  end
end
