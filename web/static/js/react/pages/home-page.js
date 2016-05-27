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
      <div id="HomePage">
        <NavBar isLoggedIn={ this.state.isLoggedIn }/>
        <div id="tophalf" className="container">
          <main role="main">
            <div id="titlequote">"We're organizing services via SMS and email"
              <br/><br/>
              </div>
              <div id="with">
              With WhosAble, the painful process of identifying and scheduling available service providers around a task is made ridiculously simple.
            </div>
            <br/><br/>
            <div id="buttons" className="row">
            <div className="col-xs-6">
            <div className="btn btn-primary">Watch the video</div>
            </div>
            <div className="col-xs-6">
            <Link to="signup">
            <div className="btn btn-primary">Signup</div>
            </Link>
            </div>
            <hr/>
            </div>
            </main>
            </div>

          <div id="bottomhalf" className="container">
            <main role="main">
          <br/><br/>
          <div id="platform">
        WhosAble is a communication platform that handles notifications between you and your service provider and gets you from job need to a scheduled confirmation quickly and seamlessly.
        </div>
        <br/>
<div id="icons" className="row">
<div className="col-xs-4">
<Link to="/secure">Secure
<i className="fa fa-lock fa-3x"></i>
</Link>
</div>
<div className="col-xs-4">
<Link to="/connect">Connect to your employees
<i className="fa fa-users fa-3x"></i>
</Link>
</div>
<div className="col-xs-4">
<Link to="/affordable">Affordable
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
