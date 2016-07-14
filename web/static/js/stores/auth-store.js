import {Socket} from "phoenix"

module.exports = {
  token: localStorage.getItem("token"),
  userID: localStorage.getItem("userID"),
  accountID: localStorage.getItem("accountID"),
  hashLocation: null,
  socket: null,
  channel: null,
  pollingInterval: null,
  pollingAttempts: 0,
  pollingConnected: false,
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
    callBack({
      isLoggedIn: window.AuthStore.isLoggedIn(),
      userID: window.AuthStore.userID,
      accountID: window.AuthStore.accountID,
      isSocketConnected: window.AuthStore.isSocketConnected(),
      pollingAttempts: window.AuthStore.pollingAttempts
    });
  },

  isLoggedIn() {
    return !!window.AuthStore.token && !!window.AuthStore.accountID && !!window.AuthStore.userID;
  },

  setSession(loginResponse) {
    localStorage.setItem("token", loginResponse.token);
    localStorage.setItem("userID", loginResponse.user_id);
    localStorage.setItem("accountID", loginResponse.account_id);
    window.AuthStore.token = loginResponse.token;
    window.AuthStore.userID = loginResponse.user_id;
    window.AuthStore.accountID = loginResponse.account_id;
    window.AuthStore.connectSocket();
    window.AuthStore.sendCallBacks();
  },

  clearSession() {
    localStorage.clear();

    window.AuthStore.token = null;
    window.AuthStore.userID = null;
    window.AuthStore.accountID = null;
    window.AuthStore.sendCallBacks();
  },

  isSocketConnected() {
    return window.AuthStore.socket && window.AuthStore.socket.isConnected();
  },

  pollConnection() {
    if(window.AuthStore.isSocketConnected()) {
      if(!window.AuthStore.pollingConnected) {
        window.AuthStore.pollingConnected = true;
        window.AuthStore.sendCallBacks();
      }
    } else {
      window.AuthStore.pollingConnected = false;
      window.AuthStore.pollingAttempts++;
      window.AuthStore.sendCallBacks();
    }
  },

  connectSocket() {
    if(window.AuthStore.isLoggedIn() && !window.AuthStore.socket) {
      window.AuthStore.pollingInterval = setInterval(window.AuthStore.pollConnection, 500);

      window.AuthStore.socket = new Socket("/account_socket", {params: {token: window.AuthStore.token}})
      window.AuthStore.socket.connect()

      window.AuthStore.channel = window.AuthStore.socket.channel("account:" + window.AuthStore.accountID, {token: window.AuthStore.token})
      window.AuthStore.channel.join()
        .receive("ok", (resp) => { console.log("Joined successfully", resp); })
        .receive("error", (resp) => { console.log("Unable to join", resp); });
    }
  },
};
