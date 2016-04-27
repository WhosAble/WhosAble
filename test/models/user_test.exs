defmodule WhosAble.UserTest do
  use WhosAble.ModelCase
  alias WhosAble.User

  defp errors_on(model \\ %User{}, params) do
    model.__struct__.changeset(model, params).errors
  end

  test "first_name required validation" do
    assert {:first_name, "can't be blank"} in errors_on(%{first_name: nil})
    refute {:first_name, "can't be blank"} in errors_on(%{first_name: "Anakin"})
  end

  test "last_name required validation" do
    assert {:last_name, "can't be blank"} in errors_on(%{last_name: nil})
    refute {:last_name, "can't be blank"} in errors_on(%{last_name: "Skywalker"})
  end

  test "email required validation" do
    assert {:email, "can't be blank"} in errors_on(%{email: nil})
    assert {:email, "has invalid format"} in errors_on(%{email: "test@test.a"})
    refute {:email, "can't be blank"} in errors_on(%{email: "test@test.com"})
  end

  test "password required validation" do
    assert {:password, "can't be blank"} in errors_on(%{password: nil})
    assert {:password, {"should be at least %{count} character(s)", [count: 8]}} in errors_on(%{password: "test"})
    refute {:pasword, "can't be blank"} in errors_on(%{password: "password"})
  end
end
