import {Socket} from "phoenix"

module.exports = {
  token: sessionStorage.getItem("token"),
  userID: sessionStorage.getItem("userID"),
  accountID: sessionStorage.getItem("accountID"),
  hashLocation: null,
  socket: null,
  channel: null,
  callBacks: [],

  subscribe(callBack) {
    window.AuthStore.callBacks.push(callBack);
    window.AuthStore.sendCallBack(callBack);
  },

  unsubscribe(callBack) {
    var i = window.AuthStore.callBacks.indexOf(callBack);
    if(i != -1) {
      window.AuthStore.callBacks.splice(i, 1);
    }
  },

  sendCallBacks() {
    window.AuthStore.callBacks.forEach(function (callBack) {
      if(callBack && typeof(callBack) === "function") {
        window.AuthStore.sendCallBack(callBack);
      }
    });
  },

  sendCallBack(callBack) {
    callBack(window.AuthStore.isLoggedIn(), window.AuthStore.userID, window.AuthStore.accountID);
  },

  isLoggedIn() {
    return !!window.AuthStore.token && !!window.AuthStore.accountID && !!window.AuthStore.userID;
  },

  setSession(loginResponse) {
    sessionStorage.setItem("token", loginResponse.token);
    sessionStorage.setItem("userID", loginResponse.user_id);
    sessionStorage.setItem("accountID", loginResponse.account_id);
    window.AuthStore.token = loginResponse.token;
    window.AuthStore.userID = loginResponse.user_id;
    window.AuthStore.accountID = loginResponse.account_id;
    window.AuthStore.sendCallBacks();
  },

  clearSession() {
    sessionStorage.clear();

    window.AuthStore.token = null;
    window.AuthStore.userID = null;
    window.AuthStore.accountID = null;
    window.AuthStore.sendCallBacks();
  },

  connectSocket() {
    if(window.AuthStore.isLoggedIn() && !window.AuthStore.socket) {
      window.AuthStore.socket = new Socket(window.SOCKET_URL + "/account_socket", {params: {token: window.AuthStore.token}})
      window.AuthStore.socket.connect()

      window.AuthStore.channel = window.AuthStore.socket.channel("account:" + window.AuthStore.accountID, {token: window.AuthStore.token})
      window.AuthStore.channel.join()
        .receive("ok", resp => { console.log("Joined successfully", resp) })
        .receive("error", resp => { console.log("Unable to join", resp) })
    }
  },
};
