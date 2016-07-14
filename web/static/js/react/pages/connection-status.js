var NavBar = require("../nav-bar");
var LoadingPage = require("./loading-page");

var ConnectionStatus = React.createClass({
  getInitialState() {
    return {
      connected: false,
      pollingAttempts: 0,
      jobsLoaded: false,
      addressesLoaded: false,
      contactsLoaded: false,
      servicesLoaded: false
    };
  },

  componentDidMount() {
    window.AuthStore.subscribe(this.receiveState);
    window.JobsStore.subscribe(this.receiveJobs);
    window.AddressStore.subscribe(this.receiveAddresses);
    window.ContactsStore.subscribe(this.receiveContacts);
    window.ServiceStore.subscribe(this.receiveServices);
  },

  componentWillUnmount() {
    window.AuthStore.unsubscribe(this.receiveState);
    window.JobsStore.unsubscribe(this.receiveJobs);
    window.AddressStore.unsubscribe(this.receiveAddresses);
    window.ContactsStore.unsubscribe(this.receiveContacts);
    window.ServiceStore.unsubscribe(this.receiveServices);
  },

  receiveState(authState) {
    this.setState({
      connected: authState.isSocketConnected,
      pollingAttempts: authState.pollingAttempts
    });
  },

  receiveAddresses(addresses) {
    if(addresses != null && !this.state.addressesLoaded) {
      this.setState({addressesLoaded: true});
      window.AddressStore.unsubscribe(this.receiveAddresses);
    }
  },

  receiveContacts(contacts) {
    if(contacts != null && !this.state.contactsLoaded) {
      this.setState({contactsLoaded: true});
      window.JobsStore.unsubscribe(this.receiveContacts);
    }
  },

  receiveJobs(jobs) {
    if(jobs != null && !this.state.jobsLoaded) {
      this.setState({jobsLoaded: true});
      window.JobsStore.unsubscribe(this.receiveJobs);
    }
  },

  receiveServices(services) {
    if(services != null && !this.state.servicesLoaded) {
      this.setState({servicesLoaded: true});
      window.ServiceStore.unsubscribe(this.receiveServices);
    }
  },

  handleLogin() {
    window.Dispatcher.logout();
    window.location.href = "/login";
  },

  loaded() {
    return this.state.jobsLoaded && this.state.addressesLoaded && this.state.contactsLoaded && this.state.servicesLoaded;
  },

  renderContent() {
    if(this.loaded()) {
      return this.props.children;
    } else {
      return(<LoadingPage/>);
    }
  },

  renderFailure() {
    if(!this.state.connected && this.state.pollingAttempts > 4) {
      return(
        <div id="connection-status-overlay">
          <div id="connection-status-content">
            <div className="flex-container">
              <div className="flex-left">
                <i className="fa fa-plug"/>
              </div>
              <div className="flex-right">
                <h3>Sorry!</h3>
                <p className="description">
                  Your connection was lost.
                  <br/>
                  I wonder how that happened...
                </p>
                <p>Wait</p>
                <h4>OR</h4>
                <p id="cta" onClick={ this.handleLogin }>Login again</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  },

  render() {
    return(
      <div>
        <NavBar/>
        <div className="container">
          <main role="main">
            <div id="connection-status-wrapper">
              {this.renderFailure()}
              {this.renderContent()}
            </div>
          </main>
        </div>
      </div>
    );
  }
});

module.exports = ConnectionStatus;
