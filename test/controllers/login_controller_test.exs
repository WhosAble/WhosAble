defmodule WhosAble.LoginControllerTest do
  use WhosAble.ConnCase

  test "missing email and password", context do
    conn = context.conn |> post("/api/login")
    assert json_response(conn, 200)["status"] == "failure"
    assert json_response(conn, 200)["errors"] == [%{"code" => "invalid", "message" => "Email and password are required fields"}]
  end

  test "wrong email", context do
    user = insert(:user)

    conn = context.conn |> post("/api/login", email: "my@email.com", password: user.password)
    assert json_response(conn, 200)["status"] == "failure"
    assert json_response(conn, 200)["errors"] == [%{"code" => "failed", "message" => "Failed to authenticate!"}]
  end

  test "wrong password", context do
    user = insert(:user)

    conn = context.conn |> post("/api/login", email: user.email, password: user.password <> "wrong")
    assert json_response(conn, 200)["status"] == "failure"
    assert json_response(conn, 200)["errors"] == [%{"code" => "failed", "message" => "Failed to authenticate!"}]
  end

  test "valid login", context do
    user = insert(:user)

    conn = context.conn |> post("/api/login", email: user.email, password: user.password)
    assert json_response(conn, 200)["status"] == "success"
    assert json_response(conn, 200)["token"] != nil
    assert json_response(conn, 200)["user_id"] != nil
  end
end
