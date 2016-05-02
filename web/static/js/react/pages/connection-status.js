var NavBar = require("../nav-bar");

var ConnectionStatus = React.createClass({
  getInitialState() {
    return {
      connected: false,
      pollingAttempts: 0
    };
  },

  componentDidMount() {
    window.AuthStore.subscribe(this.receiveState);
  },

  componentWillUnmount() {
    window.AuthStore.unsubscribe(this.receiveState);
  },

  receiveState(authState) {
    this.setState({
      connected: authState.connected,
      pollingAttempts: authState.pollingAttempts
    });
  },

  handleLogin() {
    window.Dispatcher.logout();
    window.location.href = "/login";
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
      <div id="connection-status-wrapper">
        {this.renderFailure()}
        {this.props.children}
      </div>
    );
  }
});

module.exports = ConnectionStatus;
