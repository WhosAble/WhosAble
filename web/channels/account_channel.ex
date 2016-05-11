defmodule WhosAble.AccountChannel do
  use WhosAble.Web, :channel

  def join("account:" <> account_id, %{"token" => token}, socket) do
    case Phoenix.Token.verify(socket, "account socket", token) do
      {:ok, %{account_id: token_account_id, user_id: user_id}} ->
        case parse_int(account_id) == token_account_id do
          true ->
            socket = socket |> assign(:user_id, user_id)
            {:ok, socket}
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
  def handle_in("create_contact", msg, socket) do
    account = get_account(socket)
    params = Map.merge(scrub_params(msg), %{"account_id" => account.id})
    case WhosAble.Repo.insert(WhosAble.Contact.changeset(%WhosAble.Contact{}, params)) do
      {:ok, contact} ->
        WhosAble.AccountChannel.Contact.new_contact(contact, socket)
        {:reply, {:ok, %{contact_id: contact.id}}, socket}
      {:error, changeset} ->
        {:reply, {:error, %{errors: errors_json(changeset)}}, socket}
    end
  end
  def handle_in("create_job", %{"job" => job_params, "contacts" => contact_params}, %{assigns: %{user_id: user_id}} = socket) do
    account = get_account(socket)
    params = Map.merge(scrub_params(job_params), %{"account_id" => account.id, "user_id" => user_id})
    case WhosAble.Repo.insert(WhosAble.Job.changeset(%WhosAble.Job{}, params)) do
      {:ok, job} ->
        create_job_contacts(job, contact_params)
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
  def handle_in("request_contacts", _, socket) do
    WhosAble.AccountChannel.Contact.all_contacts(socket)
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

  def parse_topic(%{topic: "account:" <> account_id}), do: parse_int(account_id)
  def parse_topic(_), do: nil

  ###
  ### PRIVATE
  ###

  defp create_job_contacts(job, []), do: nil
  defp create_job_contacts(job, [contact_id | contacts]) do
    case WhosAble.Repo.insert(WhosAble.JobContact.changeset(%WhosAble.JobContact{}, %{job_id: job.id, contact_id: contact_id})) do
      {:ok, job_contact} ->
        sms_id = WhosAble.SendMessage.send_message(job, contact_id)
        WhosAble.Repo.update(Ecto.Changeset.change(job_contact, %{sms_id: sms_id}))
    end
    create_job_contacts(job, contacts)
  end

  defp errors_json(changeset) do
    Enum.map(changeset.errors, fn {field, message} ->
      %{
        field: field,
        message: render_message(message)
      }
    end)
  end

  defp parse_int(str) do
    case Integer.parse(str) do
      {int, _} -> int
      _ -> nil
    end
  end

  defp render_message({message, values}) do
    Enum.reduce values, message, fn {k, v}, acc ->
      String.replace(acc, "%{#{k}}", to_string(v))
    end
  end
  defp render_message(message), do: message
end