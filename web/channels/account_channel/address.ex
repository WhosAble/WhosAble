defmodule WhosAble.AccountChannel.Address do
  import Phoenix.Channel, only: [broadcast: 3]
  import Ecto.Query

  alias WhosAble.{AccountChannel, Address, Repo}

  def all_addresses(socket) do
    account = AccountChannel.get_account(socket)

    broadcast(socket, "all_addresses", addresses_json(account))
  end

  def new_address(address, socket) do
    broadcast(socket, "new_address", address_json(address))
  end

  ###
  ### PRIVATE
  ###

  defp address_json(address) do
    %{
      id: address.id,
      address: address.address,
      city: address.city,
      state: address.state,
      zip: address.zip
    }
  end

  defp addresses_json(nil), do: %{addresses: []}
  defp addresses_json(account) do
    addresses = Address
      |> where(account_id: ^account.id)
      |> Repo.all
      |> Enum.reduce([], fn(address, acc) -> List.insert_at(acc, 0, address_json(address)) end)
    %{
      addresses: addresses
    }
  end
end
