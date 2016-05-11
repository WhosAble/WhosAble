defmodule WhosAble.Repo.Migrations.RemoveLocations do
  use Ecto.Migration

  def change do
    drop table(:locations)
  end
end
