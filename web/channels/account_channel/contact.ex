defmodule WhosAble.AccountChannel.Contact do
  import Phoenix.Channel, only: [broadcast: 3]
  import Ecto.Query

  alias WhosAble.{AccountChannel, Contact, Repo}

  def all_contacts(socket) do
    account = AccountChannel.get_account(socket)

    broadcast(socket, "all_contacts", contacts_json(account))
  end

  def new_contact(contact, socket) do
    broadcast(socket, "new_contact", contact_json(contact))
  end

  ###
  ### PRIVATE
  ###

  defp contact_json(contact) do
    %{
      id: contact.id,
      service_id: contact.service_id,
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
      hourly_rate: contact.hourly_rate
    }
  end

  defp contacts_json(nil), do: %{contacts: []}
  defp contacts_json(account) do
    contacts = Contact
      |> where(account_id: ^account.id)
      |> Repo.all
      |> Enum.reduce([], fn(contact, acc) -> List.insert_at(acc, 0, contact_json(contact)) end)
    %{
      contacts: contacts
    }
  end
end