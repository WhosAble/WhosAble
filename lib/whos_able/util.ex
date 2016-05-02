defmodule WhosAble.Util do
  def shared_assign(%Plug.Conn{} = conn, key, value), do: Plug.Conn.assign(conn, key, value)
  def shared_assign(%Phoenix.Socket{} = conn, key, value), do: Phoenix.Socket.assign(conn, key, value)

  def scrub_params(params) do
    for {k, v} <- params, into: %{} do
      case v == "" do
        true -> {k, nil}
        false -> {k, v}
      end
    end
  end
end
