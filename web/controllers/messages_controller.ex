defmodule WhosAble.MessagesController do
  use WhosAble.Web, :controller

#   EXAMPLE PARAMS:
#   %{"From" => "12145644571",
#   "MessageUUID" => "d9de8f48-17c5-11e6-96a7-22000ae98567", "Text" => "Testing",
#   "To" => "18053959515", "TotalAmount" => "0", "TotalRate" => "0",
#   "Type" => "sms", "Units" => "1"}
  def receive(conn, %{"MessageUUID" => sms_id, "Text" => response}) do
    job_contact = WhosAble.Repo.get_by(WhosAble.JobContact, %{sms_id: sms_id})
    WhosAble.Repo.update(Ecto.Changeset.change(job_contact, %{response: response}))
    conn |> render("show.json")
  end
end