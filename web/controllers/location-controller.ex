# defmodule Api.LocationController do
#   use Api.Web, :controller
# 
#   alias Api.Location
# 
#   plug :scrub_params, "location" when action in [:create, :update]
# 
#   def create(conn, %{"location" => location_params}) do
#     changeset = Location.changeset(%Location{}, Map.merge(location_params, %{"account_id" => conn.assigns.current_account.id}))
# 
#     case Repo.insert(changeset) do
#       {:ok, location} ->
# #         Api.Fort.put("accounts", ["abc", "def"])
# #         Location.create_firebase(location)
#         Api.Fort.put("accounts/0/locations", [%{"test" => "result"}])
# 
#         conn
#         |> assign(:location, location)
#         |> render("success.json")
#       {:error, changeset} ->
#         conn
#         |> assign(:changeset, changeset)
#         |> render("error.json")
#     end
#   end
# 
#   def update(conn, %{"location_id" => id, "location" => location_params}) do
#     location = Repo.get_by(Location, %{id: id, account_id: conn.assigns.current_account.id})
#     changeset = Location.update_changeset(location, location_params)
# 
#     case Repo.update(changeset) do
#       {:ok, location} ->
#         Api.Fort
#         conn
#         |> assign(:location, location)
#         |> render("success.json")
#       {:error, changeset} ->
#         conn
#         |> assign(:changeset, changeset)
#         |> render("error.json")
#     end
#   end
# 
#   def destroy(conn, %{"location_id" => id}) do
#     location = Repo.get_by(Location, %{id: id, account_id: conn.assigns.current_account.id})
#     Repo.delete(location)
#     conn |> render("destroy.json")
#   end
# end
