defmodule WhosAble.Repo.Migrations.LoginToken do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :token_hash, :string
      add :last_login, :datetime
    end
  end
end
