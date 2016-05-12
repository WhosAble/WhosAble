defmodule WhosAble.Repo.Migrations.PhoneStr do
  use Ecto.Migration

  def change do
    alter table(:contacts) do
      modify :phone, :string
    end

    alter table(:jobs) do
      modify :notes, :text
    end
  end
end
