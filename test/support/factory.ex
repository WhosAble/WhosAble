defmodule WhosAble.Factory do
  use ExMachina.Ecto, repo: WhosAble.Repo

  def account_factory do
    %WhosAble.Account{}
  end

  def user_factory do
    %WhosAble.User{
      account_id: insert(:account).id,
      first_name: sequence(:first_name, &"User#{&1}"),
      last_name: sequence(:last_name, &"User#{&1}"),
      email: sequence(:email, &"test#{&1}@test.com"),
      password: "password",
      password_hash: Comeonin.Bcrypt.hashpwsalt("password")
    }
  end
end
