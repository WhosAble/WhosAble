defmodule WhosAble.JobContact do
  use WhosAble.Web, :model

  schema "job_contacts" do
    field :sms_id

    belongs_to :job, WhosAble.Job
    belongs_to :contact, WhosAble.Contact

    timestamps
  end

  ###
  ### CHANGESETS
  ###

  def changeset(model, params \\ :empty) do
    model |> cast(params, ~w(job_id contact_id), [])
  end
end
