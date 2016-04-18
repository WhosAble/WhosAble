defmodule Api.LocationControllerTest do
  use Api.ConnCase

  @token "test"

  setup do
    user = create(:user, token_hash: Comeonin.Bcrypt.hashpwsalt(@token))

    header = "Basic " <> Base.encode64("#{user.id}:#{@token}")

    {:ok, user: user, header: header}
  end

  test "get locations", context do
    conn = context.conn
    |> Plug.Conn.put_req_header("authorization", context.header)
    |> get("/locations")

    assert json_response(conn, 200)["locations"] == []
  end
end
