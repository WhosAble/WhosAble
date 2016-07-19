var AllLocations = require("../all-locations");
import {browserHistory} from 'react-router';

var LocationsPage = React.createClass({
  handleCreate() {
    browserHistory.push("/app/locations/new")
  },

  handleNew() {
    browserHistory.push("/app/locations/new");
  },

  render() {
    return(<AllLocations onNew={this.handleNew} onCreate={this.handleCreate}/>);
  }
});

module.exports = LocationsPage;
