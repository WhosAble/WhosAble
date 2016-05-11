defmodule WhosAble.AccountChannel.Service do
  use WhosAble.Web, :channel

  import Ecto.Query

  def all_services(socket) do
    account = WhosAble.AccountChannel.get_account(socket)

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
    services = WhosAble.Service
      |> where(account_id: ^account.id)
      |> Repo.all
      |> Enum.reduce([], fn(service, acc) -> List.insert_at(acc, 0, %{id: service.id, name: service.name}) end)
    %{
      services: services
    }
  end
end
