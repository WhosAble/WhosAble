defmodule WhosAble.JobContact do
  use WhosAble.Web, :model

  schema "job_contacts" do
    field :sms_id
    field :response

    belongs_to :job, WhosAble.Job
    belongs_to :contact, WhosAble.Contact

    timestamps
  end

  def job_contacts(job_id) do
    WhosAble.Repo.all(from(jc in WhosAble.JobContact, left_join: c in WhosAble.Contact, on: jc.contact_id == c.id, select: %{first_name: c.first_name, last_name: c.last_name, response: jc.response}, where: jc.job_id == ^job_id))
  end

  ###
  ### CHANGESETS
  ###

  def changeset(model, params \\ :empty) do
    model |> cast(params, ~w(job_id contact_id), [])
  end
end
