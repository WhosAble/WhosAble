# fire up ex_machina
{:ok, _} = Application.ensure_all_started(:ex_machina)

ExUnit.start

Mix.Task.run "ecto.create", ~w(-r Api.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r Api.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(Api.Repo)

