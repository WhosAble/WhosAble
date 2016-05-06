defmodule WhosAble.AccountChannel do
  use WhosAble.Web, :channel

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

  def handle_in("create_address", msg, socket) do
    account = get_account(socket)
    params = Map.merge(scrub_params(msg), %{"account_id" => account.id})
    case WhosAble.Repo.insert(WhosAble.Address.changeset(%WhosAble.Address{}, params)) do
      {:ok, address} ->
        WhosAble.AccountChannel.Address.new_address(address, socket)
        {:reply, {:ok, %{address_id: address.id}}, socket}
      {:error, changeset} ->
        {:reply, {:error, %{errors: errors_json(changeset)}}, socket}
    end
  end
  def handle_in("create_job", msg, socket) do
    account = get_account(socket)
    params = Map.merge(scrub_params(msg), %{"account_id" => account.id})
    case WhosAble.Repo.insert(WhosAble.Job.changeset(%WhosAble.Job{}, params)) do
      {:ok, job} ->
        WhosAble.AccountChannel.Job.new_job(job, socket)
        {:reply, {:ok, %{job_id: job.id}}, socket}
      {:error, changeset} ->
        {:reply, {:error, %{errors: errors_json(changeset)}}, socket}
    end
  end
  def handle_in("create_service", msg, socket) do
    account = get_account(socket)
    params = Map.merge(scrub_params(msg), %{"account_id" => account.id})
    case WhosAble.Repo.insert(WhosAble.Service.changeset(%WhosAble.Service{}, params)) do
      {:ok, service} ->
        WhosAble.AccountChannel.Service.new_service(service, socket)
        {:reply, {:ok, %{service_id: service.id}}, socket}
      {:error, changeset} ->
        {:reply, {:error, %{errors: errors_json(changeset)}}, socket}
    end
  end
  def handle_in("request_addresses", _, socket) do
    WhosAble.AccountChannel.Address.all_addresses(socket)
    {:noreply, socket}
  end
  def handle_in("request_jobs", _, socket) do
    WhosAble.AccountChannel.Job.all_jobs(socket)
    {:noreply, socket}
  end
  def handle_in("request_services", _, socket) do
    WhosAble.AccountChannel.Service.all_services(socket)
    {:noreply, socket}
  end

  def get_account(socket), do: WhosAble.Repo.get(WhosAble.Account, parse_topic(socket))

  ###
  ### PRIVATE
  ###

  defp errors_json(changeset) do
    Enum.map(changeset.errors, fn {field, message} ->
      %{
        field: field,
        message: render_message(message)
      }
    end)
  end

  defp parse_account_id(account_id) do
    case Integer.parse(account_id) do
      {id, _} -> id
      _ -> nil
    end
  end

  defp parse_int(str) do
    case Integer.parse(str) do
      {int, _} -> int
      _ -> nil
    end
  end

  def parse_topic(%{topic: "account:" <> account_id}), do: parse_int(account_id)
  def parse_topic(_), do: nil

  defp render_message({message, values}) do
    Enum.reduce values, message, fn {k, v}, acc ->
      String.replace(acc, "%{#{k}}", to_string(v))
    end
  end
  defp render_message(message), do: message
end