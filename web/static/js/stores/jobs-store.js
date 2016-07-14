import {Socket} from "phoenix"
import _ from "lodash";

module.exports = {
  jobs: null,
  callBacks: [],

  subscribe(callBack) {
    window.JobsStore.connectToChannel();
    window.JobsStore.callBacks.push(callBack);
    window.JobsStore.sendCallBack(callBack);
  },

  unsubscribe(callBack) {
    var i = window.JobsStore.callBacks.indexOf(callBack);
    if(i != -1) {
      window.JobsStore.callBacks.splice(i, 1);
    }
  },

  sendCallBacks() {
    window.JobsStore.callBacks.forEach(function (callBack) {
      if(callBack && typeof(callBack) === "function") {
        window.JobsStore.sendCallBack(callBack);
      }
    });
  },

  sendCallBack(callBack) {
    if(window.JobsStore.jobs == null) {
      callBack(null);
    } else {
      callBack(_.cloneDeep(_.values(window.JobsStore.jobs)));
    }
  },

  addNewJob(job) {
    window.JobsStore.jobs[job.id] = job;
    window.JobsStore.sendCallBacks();
  },

  refreshJob(jobs) {
    var newJob = {};
    jobs.forEach(function (job) {
      newJob[job.id] = job;
    });
    window.JobsStore.jobs = newJob;
    window.JobsStore.sendCallBacks();
  },

  connectToChannel() {
    if(window.AuthStore.isLoggedIn() && window.AuthStore.channel && window.JobsStore.jobs == null) {
      window.AuthStore.channel.on("new_job", (job) => {
        window.JobsStore.addNewJob(job);
      })
      window.AuthStore.channel.on("all_jobs", (response) => {
        window.JobsStore.refreshJob(response.jobs);
      });
      window.AuthStore.channel.push("request_jobs", {});
    }
  }
};
