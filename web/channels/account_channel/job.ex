defmodule WhosAble.AccountChannel.Job do
  import Phoenix.Channel, only: [broadcast: 3]
  import Ecto.Query

  alias WhosAble.{AccountChannel, Address, Job, JobContact, Repo, Service}

  def all_jobs(socket) do
    account = AccountChannel.get_account(socket)

    broadcast(socket, "all_jobs", jobs_json(account))
  end

  def new_job(job, socket) do
    broadcast(socket, "new_job", job_json(job))
  end

  ###
  ### PRIVATE
  ###

  defp contacts_json(job) do
    JobContact.job_contacts(job.id)
  end

  defp job_json(job) do
    service = Repo.get(Service, job.service_id)
    address = Repo.get(Address, job.address_id)
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
    jobs = Job
      |> where(account_id: ^account.id)
      |> Repo.all
      |> Enum.reduce([], fn(job, acc) -> List.insert_at(acc, 0, job_json(job)) end)
    %{
      jobs: jobs
    }
  end
end
