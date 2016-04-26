defmodule WhosAble.UserControllerTest do
  use WhosAble.ConnCase

  alias WhosAble.Account
  alias WhosAble.User

  test "create with no params", context do
    starting_users_count = user_count
    starting_accounts_count = account_count

    conn = context.conn |> post("/api/signup")

    # Should have errors
    assert json_response(conn, 200) == %{"errors" => [%{"code" => "invalid", "message" => "No user provided"}], "status" => "failure"}

    # Should not create any records
    assert starting_users_count == user_count
    assert starting_accounts_count == account_count
  end

  test "create with invalid email", context do
    starting_users_count = user_count
    starting_accounts_count = account_count

    params = generate_user(%{email: "test@test.a"})
    conn = context.conn |> post("/api/signup", %{user: params})

    # Should have errors
    assert json_response(conn, 200)["errors"] == [%{"field" => "email", "message" => "has invalid format"}]

    # Should not create any records
    assert starting_users_count == user_count
    assert starting_accounts_count == account_count
  end

  test "duplicate email", context do
    create(:user, email: "test@test.com")
    starting_users_count = user_count
    starting_accounts_count = account_count

    params = generate_user(%{email: "test@test.com"})
    conn = context.conn |> post("/api/signup", %{user: params})

    # Should have errors
    assert json_response(conn, 200)["errors"] != nil

    # Should not create any records
    assert starting_users_count == user_count
    assert starting_accounts_count == account_count
  end

  test "short password", context do
    starting_users_count = user_count
    starting_accounts_count = account_count

    params = generate_user(%{password: "test"})
    conn = context.conn |> post("/api/signup", %{user: params})

    # Should have errors
    assert json_response(conn, 200)["errors"] != nil

    # Should not create any records
    assert starting_users_count == user_count
    assert starting_accounts_count == account_count
  end

  test "valid", context do
    starting_users_count = user_count
    starting_accounts_count = account_count

    conn = context.conn |> post("/api/signup", %{user: generate_user(%{})})

    # Should be successful
    assert json_response(conn, 200)["status"] == "success"

    # Should create user and account
    assert starting_users_count + 1 == user_count
    assert starting_accounts_count + 1 == account_count
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

  defp account_count do
    Repo.one(from a in Account, select: count(a.id))
  end

  defp user_count do
    Repo.one(from u in User, select: count(u.id))
  end
end
