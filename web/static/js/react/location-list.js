var Location = require("./location");
import _ from "lodash";

var LocationList = React.createClass({
  handleSelect(locationID) {
    this.props.onSelect(locationID);
  },

  render() {
     var locations = this.props.addresses.map((address, index) => {
       return(<Location key={address.id} addresses={address} onSelect={this.handleSelect}/>);
     });

    return(
      <div className="locations">
      {locations}
      </div>
    );
  },
});

module.exports = LocationList;
