defmodule Api.Factory do
  use ExMachina.Ecto, repo: Api.Repo

  def factory(:user) do
    %Api.User{
      first_name: sequence(:first_name, &"User#{&1}"),
      last_name: sequence(:last_name, &"User#{&1}"),
      email: sequence(:email, &"test#{&1}@test.com"),
      password: "password",
      password_hash: Comeonin.Bcrypt.hashpwsalt("password")
    }
  end
end
