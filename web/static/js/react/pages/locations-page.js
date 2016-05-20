var NavBar = require("../nav-bar");
var LocationForm = require("../forms/location-form");

var LocationsPage = React.createClass({
  propTypes: {
  },
  render() {
    return(
      <div>
        <NavBar/>
        <div className="container">
          <main role="main">
            <LocationForm/>
          </main>
        </div>
      </div>
    );
  }
});
module.exports = LocationsPage;
