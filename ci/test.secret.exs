use Mix.Config

# Configure your database
config :api, Api.Repo,
  adapter: Ecto.Adapters.Postgres,
  database: "api_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
