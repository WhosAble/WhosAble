defmodule WhosAble.Repo.Migrations.Jobs do
  use Ecto.Migration

  def change do
    create table(:jobs) do
      add :service_id, references(:services)
      add :address_id, references(:addresses)
      add :account_id, references(:accounts)
      add :start, :datetime
      add :end, :datetime
      add :notes, :string

      timestamps
    end

    create index(:jobs, [:account_id])
    create index(:jobs, [:service_id])
    create index(:jobs, [:address_id])
    create index(:jobs, [:start])
    create index(:jobs, [:end])
  end
end
