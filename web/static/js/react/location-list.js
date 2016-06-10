Location = require("./location");
var Job = require("./location-list");
import _ from "lodash";

var LocationList = React.createClass({
  render() {
     var locations = this.props.addresses.map(function(address, index) {
       return(<Location addresses={address}/>);
     });

    return(
      <div className="locations">
      {locations}
      </div>
    );
  },
});

module.exports = LocationList;
