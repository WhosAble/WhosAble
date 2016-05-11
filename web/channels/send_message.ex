defmodule WhosAble.SendMessage do
  use WhosAble.Web, :channel

  def send_message(job, contact_id) do
    config = Application.get_env(:whos_able, WhosAble.Endpoint)
    plivo_auth_id = config[:plivo_auth_id]
    plivo_auth_password = config[:plivo_auth_password]
    plivo_number = config[:plivo_number]

    url = "https://api.plivo.com/v1/Account/#{plivo_auth_id}/Message/"

    message = "Tyler, it's Mike Hoffert. I'm using the WhosAble app to find a CEO for June 4th from 10:00 AM to 11:00 AM. Are you able? Simply reply with 'y' or 'n' to let me know. Powered by WhosAble.com."
    contact = WhosAble.Repo.get(WhosAble.Contact, contact_id)
    data = Poison.encode!(%{src: plivo_number, dst: "+1" <> contact.phone, text: message})

    encoded = Base.encode64("#{plivo_auth_id}:#{plivo_auth_password}")
    options = [{"content-type", "application/json"}, {"Authorization", "Basic #{encoded}"}]

    case HTTPoison.post(url, data, options) do
      {:ok, resp} -> parse_body(resp)
      resp -> nil
    end
  end

  ###
  ### PRIVATE
  ###

  defp parse_body(%HTTPoison.Response{body: body}) do
    case Poison.decode(body) do
      {:ok, %{"message_uuid" => [uuid]}} -> uuid
      _ -> nil
    end
  end
end
