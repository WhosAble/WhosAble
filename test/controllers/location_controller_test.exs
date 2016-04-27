# defmodule WhosAble.LocationControllerTest do
#   use WhosAble.ConnCase
# 
#   @token "test"
# 
#   setup do
#     user = create(:user, token_hash: Comeonin.Bcrypt.hashpwsalt(@token))
# 
#     header = "Basic " <> Base.encode64("#{user.id}:#{@token}")
# 
#     {:ok, user: user, header: header}
#   end
# 
#   test "create location", context do
#     conn = context.conn
#     |> Plug.Conn.put_req_header("authorization", context.header)
#     |> post("/location", %{location: %{name: "Tatooine", address: "123 Sesame St", city: "Lehi", state: "UT", zip: "12345"}})
# 
#     assert json_response(conn, 200)["location"]["id"] != nil
#   end
# end
