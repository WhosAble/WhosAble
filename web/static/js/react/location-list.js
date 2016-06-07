var CreateBtn = require("./create-btn");
var Job = require("./location-list");
import _ from "lodash";

var LocationList = React.createClass({
  handleCreate() {
    browserHistory.push("/app/newlocationspage")
  },

  render() {
    if(this.props.addresses == null || this.props.addresses.length == 0) {
      return <CreateBtn title="Create a new Location" onCreate={ this.handleCreate }/>
    }

    return(
      <div className="locations">
      </div>
    );
  },
});

module.exports = LocationList;
