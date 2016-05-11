defmodule WhosAble.Repo.Migrations.Response do
  use Ecto.Migration

  def change do
    alter table(:job_contacts) do
      add :response, :string
    end
  end
end
