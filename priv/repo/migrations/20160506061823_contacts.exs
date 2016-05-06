defmodule WhosAble.Repo.Migrations.Contacts do
  use Ecto.Migration

  def change do
    create table(:contacts) do
      add :account_id, references(:accounts)
      add :service_id, references(:services)
      add :first_name, :string
      add :last_name, :string
      add :email, :string
      add :phone, :string
      add :hourly_rate, :integer

      timestamps
    end

    create index(:contacts, [:first_name])
    create index(:contacts, [:last_name])
    create index(:contacts, [:email])
    create index(:contacts, [:phone])
  end
end
