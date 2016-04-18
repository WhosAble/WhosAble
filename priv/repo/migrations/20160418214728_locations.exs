defmodule Api.Repo.Migrations.Locations do
  use Ecto.Migration

  def change do
    create table(:locations) do
      add :account_id, references(:accounts)
      add :name, :string
      add :address, :string
      add :city, :string
      add :state, :string
      add :zip, :string

      timestamps
    end

    create unique_index(:locations, [:account_id])
  end
end
