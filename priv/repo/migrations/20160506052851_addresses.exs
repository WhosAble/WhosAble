defmodule WhosAble.Repo.Migrations.Addresses do
  use Ecto.Migration

  def change do
    create table(:addresses) do
      add :address, :string
      add :city, :string
      add :state, :string
      add :zip, :string
      add :account_id, references(:accounts)

      timestamps
    end

    create index(:addresses, [:account_id])
    create index(:addresses, [:city])
    create index(:addresses, [:state])
    create index(:addresses, [:zip])
  end
end
