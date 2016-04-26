# defmodule WhosAble.LocationView do
#   use WhosAble.Web, :view
# 
#   def render("success.json", %{location: location}) do
#     %{
#       location: %{
#         id: location.id
#       }
#     }
#   end
#   def render("error.json", %{changeset: changeset}) do
#     errors = Enum.map(changeset.errors, fn {field, message} ->
#       %{
#         field: field,
#         message: render_message(message)
#       }
#     end)
# 
#     %{errors: errors}
#   end
#   def render("destroy.json", _), do: %{status: "success"}
# 
#   def render_message({message, values}) do
#     Enum.reduce values, message, fn {k, v}, acc ->
#       String.replace(acc, "%{#{k}}", to_string(v))
#     end
#   end
#   def render_message(message), do: message
# end