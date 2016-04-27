var NavBar = require("../nav-bar");

var DashboardPage = React.createClass({
  propTypes: {
  },

  render() {
    return(
      <div>
        <NavBar/>
        <div className="container">
          <main role="main">
            <div id="createbutton">
              <i className="fa fa-plus"></i>
              <div id="button-label">Create a new Job</div>
            </div>
          </main>
        </div>
      </div>
    );
  }
});

module.exports = DashboardPage;
