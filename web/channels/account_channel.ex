defmodule Api.AccountChannel do
  use Phoenix.Channel

  def join("account:" <> account_id, %{"token" => token}, socket) do
    case Phoenix.Token.verify(socket, "account socket", token) do
      {:ok, %{account_id: token_account_id, user_id: _}} ->
        case parse_account_id(account_id) == token_account_id do
          true -> {:ok, socket}
          false -> {:error, %{reason: "unauthorized"}}
        end
    end
  end
  def join(_room, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  ###
  ### PRIVATE
  ###

  defp parse_account_id(account_id) do
    case Integer.parse(account_id) do
      {id, _} -> id
      _ -> nil
    end
  end
end