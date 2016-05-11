defmodule WhosAble.Repo.Migrations.JobContacts do
  use Ecto.Migration

  def change do
    create table(:job_contacts) do
      add :job_id, references(:jobs)
      add :contact_id, references(:contacts)
      add :sms_id, :string

      timestamps
    end

    create unique_index(:job_contacts, [:job_id, :contact_id])
    create index(:job_contacts, [:sms_id])
  end
end
