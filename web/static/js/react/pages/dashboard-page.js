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
            <button id="createbutton">
              <i className="fa fa-plus"></i>
              <div id="button-label">Create a new Job</div>
            </button>
          </main>
        </div>
      </div>
    );
  }
});

module.exports = DashboardPage;
