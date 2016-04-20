defmodule Api.Repo.Migrations.RemoveHashToken do
  use Ecto.Migration

  def change do
    alter table(:users) do
      remove :token_hash
      remove :last_login
    end
  end
end
