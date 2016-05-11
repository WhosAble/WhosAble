defmodule WhosAble.AccountChannel.Job do
  use WhosAble.Web, :channel

  import Ecto.Query

  def all_jobs(socket) do
    account = WhosAble.AccountChannel.get_account(socket)

    broadcast(socket, "all_jobs", jobs_json(account))
  end

  def new_job(job, socket) do
    broadcast(socket, "new_job", job_json(job))
  end

  ###
  ### PRIVATE
  ###

  defp contacts_json(job) do
    WhosAble.JobContact.job_contacts(job.id)
  end

  defp job_json(job) do
    service = WhosAble.Repo.get(WhosAble.Service, job.service_id)
    address = WhosAble.Repo.get(WhosAble.Address, job.address_id)
    %{
      id: job.id,
      service_id: job.service_id,
      service_name: service.name,
      address_id: job.address_id,
      address: %{address: address.address, city: address.city, state: address.state, zip: address.zip},
      start: job.start,
      end: job.end,
      notes: job.notes,
      contacts: contacts_json(job)
    }
  end

  defp jobs_json(nil), do: %{jobs: []}
  defp jobs_json(account) do
    jobs = WhosAble.Job
      |> where(account_id: ^account.id)
      |> Repo.all
      |> Enum.reduce([], fn(job, acc) -> List.insert_at(acc, 0, job_json(job)) end)
    %{
      jobs: jobs
    }
  end
end
