defmodule WhosAble.Repo.Migrations.Services do
  use Ecto.Migration

  def change do
    create table(:services) do
      add :name, :string
      add :account_id, references(:accounts)

      timestamps
    end

    create index(:services, [:account_id])
    create unique_index(:services, [:name])
  end
end
