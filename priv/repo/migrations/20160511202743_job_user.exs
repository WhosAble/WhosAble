defmodule WhosAble.Repo.Migrations.JobUser do
  use Ecto.Migration

  def change do
    alter table(:jobs) do
      add :user_id, references(:users)
    end

    create index(:jobs, [:user_id])
  end
end
