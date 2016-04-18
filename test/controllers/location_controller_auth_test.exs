defmodule Api.LocationControllerAuthTest do
  use Api.ConnCase

  @token "test"

  setup do
    user = create(:user, token_hash: Comeonin.Bcrypt.hashpwsalt(@token))

    {:ok, user: user}
  end

  test "invalid token", context do
    header = "Basic " <> Base.encode64("#{context.user.id}:invalid")

    conn = context.conn
    |> Plug.Conn.put_req_header("authorization", header)
    |> get("/locations")

    assert json_response(conn, 401)
  end

  test "invalid user_id", context do
    header = "Basic " <> Base.encode64("9999:#{@token}")

    conn = context.conn
    |> Plug.Conn.put_req_header("authorization", header)
    |> get("/locations")

    assert json_response(conn, 401)
  end
end
