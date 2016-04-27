defmodule WhosAble.Repo.Migrations.Accounts do
  use Ecto.Migration

  def change do
    create table(:accounts) do
      timestamps
    end

    alter table(:users) do
      add :account_id, references(:accounts)
    end

    create index(:users, [:account_id])
  end
end
