# defmodule WhosAble.AccountSettingControllerTest do
#   use WhosAble.ConnCase
# 
#   @token "test"
# 
#   test "invalid token", context do
#     user = create(:user, token_hash: Comeonin.Bcrypt.hashpwsalt(@token))
# 
#     header = "Basic " <> Base.encode64("#{user.id}:invalid")
# 
#     conn = context.conn
#     |> Plug.Conn.put_req_header("authorization", header)
#     |> get("/account/settings")
# 
#     assert json_response(conn, 401)
#   end
# 
#   test "invalid user_id", context do
#     create(:user, token_hash: Comeonin.Bcrypt.hashpwsalt(@token))
# 
#     header = "Basic " <> Base.encode64("9999:#{@token}")
# 
#     conn = context.conn
#     |> Plug.Conn.put_req_header("authorization", header)
#     |> get("/account/settings")
# 
#     assert json_response(conn, 401)
#   end
# 
#   test "get settings", context do
#     user = create(:user, token_hash: Comeonin.Bcrypt.hashpwsalt(@token))
# 
#     header = "Basic " <> Base.encode64("#{user.id}:#{@token}")
# 
#     conn = context.conn
#     |> Plug.Conn.put_req_header("authorization", header)
#     |> get("/account/settings")
# 
#     assert json_response(conn, 200)
#   end
# end
