defmodule WhosAble.AccountChannel.Service do
  import Phoenix.Channel, only: [broadcast: 3]
  import Ecto.Query

  alias WhosAble.{AccountChannel, Repo, Service}

  def all_services(socket) do
    account = AccountChannel.get_account(socket)

    broadcast(socket, "all_services", services_json(account))
  end

  def new_service(service, socket) do
    broadcast(socket, "new_service", service_json(service))
  end

  ###
  ### PRIVATE
  ###

  defp service_json(service) do
    %{
      id: service.id,
      name: service.name
    }
  end

  defp services_json(nil), do: %{services: []}
  defp services_json(account) do
    services = Service
      |> where(account_id: ^account.id)
      |> Repo.all
      |> Enum.reduce([], fn(service, acc) -> List.insert_at(acc, 0, %{id: service.id, name: service.name}) end)
    %{
      services: services
    }
  end
end
