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
            Dashboard placeholder
          </main>
        </div>
      </div>
    );
  }
});

module.exports = DashboardPage;
