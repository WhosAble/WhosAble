{:ok, _} = Application.ensure_all_started(:ex_machina)

ExUnit.start

# Mix.Task.run "ecto.create", ~w(-r WhosAble.Repo --quiet)
# Mix.Task.run "ecto.migrate", ~w(-r WhosAble.Repo --quiet)
# Ecto.Adapters.SQL.begin_test_transaction(WhosAble.Repo)

Ecto.Adapters.SQL.Sandbox.mode(WhosAble.Repo, :manual)
