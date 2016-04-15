defmodule Api.UserControllerTest do
  use Api.ConnCase

  test "create with no params", context do
    conn = context.conn |> post("/signup")
    assert json_response(conn, 200) == %{"errors" => [%{"code" => "invalid", "message" => "No user provided"}], "status" => "failure"}
  end

  test "create with invalid email", context do
    params = generate_user(%{email: "test@test.a"})
    conn = context.conn |> post("/signup", %{user: params})
    assert json_response(conn, 200)["errors"] == [%{"field" => "email", "message" => "has invalid format"}]
  end

  test "duplicate email", context do
    create(:user, email: "test@test.com")
    params = generate_user(%{email: "test@test.com"})
    conn = context.conn |> post("/signup", %{user: params})
    assert json_response(conn, 200)["errors"] != nil
  end

  test "short password", context do
    params = generate_user(%{password: "test"})
    conn = context.conn |> post("/signup", %{user: params})
    assert json_response(conn, 200)["errors"] != nil
  end

  test "valid", context do
    conn = context.conn |> post("/signup", %{user: generate_user(%{})})
    assert json_response(conn, 200)["status"] == "success"
  end

  ###
  ### PRIVATE
  ###

  defp generate_user(params) do
    Map.merge(%{
      first_name: "Darth",
      last_name: "Vader",
      email: "test@test.com",
      password: "password",
      confirm_password: "password"
    }, params)
  end
end
