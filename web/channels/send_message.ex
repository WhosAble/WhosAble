defmodule WhosAble.SendMessage do
  def send_message(job, contact_id) do
    config = Application.get_env(:whos_able, WhosAble.Endpoint)
    plivo_auth_id = config[:plivo_auth_id]
    plivo_auth_password = config[:plivo_auth_password]
    plivo_number = config[:plivo_number]

    url = "https://api.plivo.com/v1/Account/#{plivo_auth_id}/Message/"

    contact = WhosAble.Repo.get(WhosAble.Contact, contact_id)
    data = %{src: plivo_number, dst: "+1" <> contact.phone, text: generate_message(job, contact)}
      |> Poison.encode!()

    encoded = Base.encode64("#{plivo_auth_id}:#{plivo_auth_password}")
    options = [{"content-type", "application/json"}, {"Authorization", "Basic #{encoded}"}]

    case HTTPoison.post(url, data, options) do
      {:ok, resp} -> parse_body(resp)
      _ -> nil
    end
  end

  ###
  ### PRIVATE
  ###

  defp generate_message(job, contact) do
    service = WhosAble.Repo.get(WhosAble.Service, job.service_id)
    user = WhosAble.Repo.get(WhosAble.User, job.user_id)
    contact.first_name <> ", it's " <> user.first_name <> " " <> user.last_name <>". I'm using the WhosAble app to find a " <> service.name <> " for June 4th from 10:00 AM to 11:00 AM. Are you able? Simply reply with 'y' or 'n' to let me know. Powered by WhosAble.com."
  end

  defp parse_body(%HTTPoison.Response{body: body}) do
    case Poison.decode(body) do
      {:ok, %{"message_uuid" => [uuid]}} -> uuid
      _ -> nil
    end
  end
end
