var NavBar = require("../nav-bar");
var SignupForm = require("../forms/signup-form");
import {Link} from 'react-router'
var HomePage = React.createClass({
  propTypes: {
  },

  getInitialState() {
    return {
      isLoggedIn: false
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
      isLoggedIn: authState.isLoggedIn
    });
  },

  renderSignupForm() {
    if(!this.state.isLoggedIn) {
      return(<SignupForm/>);
    }
  },

  render() {
    return(
      <div>
        <NavBar isLoggedIn={ this.state.isLoggedIn }/>
        <div className="container">
          <main role="main">
            <div style={{textAlign: "center"}}>"We're organizing services via SMS and email"
              <br/><br/>
              With WhosAble, the painful process of identifying and scheduling available service providers around a task is made ridiculously simple.
            </div>
            <div className="row">
            <div className="col-xs-6" style={{textAlign: "center"}}>
            <div className="btn btn-primary">Watch the video</div>
            </div>
            <div className="col-xs-6" style={{textAlign: "center"}}>
            <Link to="signup">
            <div className="btn btn-primary">Signup</div>
            </Link>
            </div>
            </div>
            </main>
            </div>
          <hr/>
          <div className="container">
            <main role="main">
          <br/><br/>
          <div style={{textAlign: "center"}}>
        WhosAble is a communication platform that handles notifications between you and your service provider and gets you from job need to a scheduled confirmation quickly and seamlessly.
        </div>
<div className="row">
<div className="col-xs-4" style={{textAlign: "center"}}>
<Link to="/secure">Secure
<br/>
<i className="fa fa-lock fa-3x"></i>
</Link>
</div>
<div className="col-xs-4" style={{textAlign: "center"}}>
<Link to="/connect">Connect to your employees
<br/>
<i className="fa fa-users fa-3x"></i>
</Link>
</div>
<div className="col-xs-4" style={{textAlign: "center"}}>
<Link to="/affordable">Affordable
<br/>
<i className="fa fa-usd fa-3x"></i>
</Link>
</div>
</div>
        </main>
        </div>
        </div>

    );
  }
});

module.exports = HomePage;
