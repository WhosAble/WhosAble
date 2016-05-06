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

  defp job_json(job) do
    %{
      id: job.id,
      service_id: job.service_id,
      address_id: job.address_id,
      start: job.start,
      end: job.end,
      notes: job.notes
    }
  end

  defp jobs_json(account) do
    jobs = WhosAble.Service
      |> where(account_id: ^account.id)
      |> Repo.all
      |> Enum.reduce([], fn(job, acc) -> List.insert_at(acc, 0, job_json(job)) end)
    %{
      jobs: jobs
    }
  end
end
