defmodule WhosAble.SendMessage do
  use WhosAble.Web, :channel

  def send_message(job, contact) do
    config = Application.get_env(:whos_able, WhosAble.Endpoint)
    plivo_auth_id = config[:plivo_auth_id]
    plivo_auth_password = config[:plivo_auth_password]
    plivo_number = config[:plivo_number]

    url = "https://api.plivo.com/v1/Account/#{plivo_auth_id}/Message/"

    message = "Tyler, it's Mike Hoffert. I'm using the WhosAble app to find a CEO for June 4th from 10:00 AM to 11:00 AM. Are you able? Simply reply with 'y' or 'n' to let me know. Powered by WhosAble.com."
    data = Poison.encode!(%{src: plivo_number, dst: "12817874362", text: message})

    encoded = Base.encode64("#{plivo_auth_id}:#{plivo_auth_password}")
    options = [{"content-type", "application/json"}, {"Authorization", "Basic #{encoded}"}]

    case HTTPoison.post(url, data, options) do
      {:ok, resp} ->
        IO.inspect "GOOOOOOOOOOOOOOOOOOOOOOOOOOOOD"
        IO.inspect resp
      resp ->
        IO.inspect "FAILEDDDDDDDDDDDDDDDDDDDDDDDDD"
        IO.inspect resp
    end
  end
end
