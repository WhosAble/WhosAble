defmodule WhosAble.AccountSocket do
  use Phoenix.Socket

  ## Channels
  channel "account:*", WhosAble.AccountChannel

  ## Transports
  transport :websocket, Phoenix.Transports.WebSocket
  # transport :longpoll, Phoenix.Transports.LongPoll

  def connect(%{"token" => token}, socket) do
    case Phoenix.Token.verify(socket, "account socket", token, max_age: 14 * 24 * 60 * 60) do
      {:ok, %{account_id: account_id, user_id: _}} ->
        socket |> assign(:account, account_id)
        {:ok, socket}
      {:error, _} -> :error
    end
  end
  def connect(_, _) do
    :error
  end

  # Socket id's are topics that allow you to identify all sockets for a given account:
  #
  #     def id(socket), do: "accounts_socket:#{socket.assigns.account_id}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given account:
  #
  #     WhosAble.Endpoint.broadcast("accounts_socket:#{account.id}", "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  def id(_socket), do: nil
end
