defmodule Api.Auth do
  import Plug.Conn
  import Comeonin.Bcrypt, only: [checkpw: 2]

  def init(_opts) do
  end

  def call(conn, _opts) do
    credentials = parse_auth_header(conn)

    conn
    |> assign_user(credentials.user_id)
    |> assign_account
    |> authenticate_user(credentials.token)
  end

  ###
  ### PRIVATE
  ###

  defp assign_user(conn, user_id) do
    case Api.Repo.get(Api.User, user_id) do
      nil -> conn
      user -> conn |> assign(:current_user, user)
    end
  end

  defp assign_account(%{assigns: %{user: user}} = conn) do
    conn |> assign(:account, Repo.get(Api.Account, user.account_id))
  end
  defp assign_account(conn), do: conn

  defp authenticate_user(%{assigns: %{current_user: user}} = conn, token) do
    case checkpw(token, user.token_hash) do
      true -> conn
      false -> conn |> send_unauthorized_response
    end
  end
  defp authenticate_user(conn, _), do: conn |> send_unauthorized_response

  defp decode_creds(["Basic " <> encoded]) do
    case Base.decode64(encoded) do
      {:ok, creds} -> String.split(creds, ":")
      _ -> nil
    end
  end
  defp decode_creds(_), do: nil

  defp map_creds([user_id, token]), do: %{user_id: user_id, token: token}
  defp map_creds(_), do: %{user_id: nil, token: nil}

  defp parse_auth_header(conn) do
    conn
    |> Plug.Conn.get_req_header("authorization")
    |> decode_creds
    |> map_creds
  end

  defp send_unauthorized_response(conn) do
    conn
    |> Plug.Conn.put_resp_header("www-authenticate", "Basic realm=\"API\"")
    |> Plug.Conn.put_resp_header("content-type", "application/json")
    |> Plug.Conn.send_resp(401, Poison.encode!(%{error: "unauthorized", message: "401 Unauthorized"}))
    |> Plug.Conn.halt
  end
end
