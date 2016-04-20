defmodule Api.Router do
  use Api.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :authenticated do
    plug Api.Auth
  end

  scope "/", Api do
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
end
