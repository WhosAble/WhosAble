var AllServices = require("../all-services");
import {browserHistory} from 'react-router';

var ServicesPage = React.createClass({
  handleCreate() {
    browserHistory.push("/app/services/new")
  },

  handleNew() {
    browserHistory.push("/app/services/new")
  },

  render() {
    return(<AllServices onNew={this.handleNew} onCreate={this.handleCreate}/>);
  }
});

module.exports = ServicesPage;
