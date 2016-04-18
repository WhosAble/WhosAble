defmodule Api.Factory do
  use ExMachina.Ecto, repo: Api.Repo

  def factory(:account) do
    %Api.Account{}
  end

  def factory(:location) do
    %Api.Location{
      account_id: create(:account).id,
      name: sequence(:name, &"Name #{&1}"),
      address: "123 Sesame street",
      city: "New York",
      state: "NY",
      zip: "12345"
    }
  end

  def factory(:user) do
    %Api.User{
      account_id: create(:account).id,
      first_name: sequence(:first_name, &"User#{&1}"),
      last_name: sequence(:last_name, &"User#{&1}"),
      email: sequence(:email, &"test#{&1}@test.com"),
      password: "password",
      password_hash: Comeonin.Bcrypt.hashpwsalt("password")
    }
  end
end
