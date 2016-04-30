var CreateBtn = require("../create-btn");
var NavBar = require("../nav-bar");
import {browserHistory} from 'react-router';

var DashboardPage = React.createClass({
  getInitialState() {
    return {
      services: null
    };
  },

  handleCreate() {
    browserHistory.push("/app/jobs/new")
  },

  componentDidMount() {
    window.ServiceStore.subscribe(this.receiveState);
  },

  componentWillUnmount() {
    window.ServiceStore.unsubscribe(this.receiveState);
  },

  receiveState(services) {
    this.setState({services: services});
  },

  render() {
    return(
      <div>
        <NavBar/>
        <div className="container">
          <main role="main">
            <CreateBtn title="Create a new Job" onCreate={ this.handleCreate }/>
          </main>
        </div>
      </div>
    );
  }
});

module.exports = DashboardPage;
