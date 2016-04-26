use Mix.Config

# Configure your database
config :whos_able, WhosAble.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "whos_able_dev",
  hostname: "localhost",
  pool_size: 10
