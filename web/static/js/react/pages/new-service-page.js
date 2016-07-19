var ServiceForm = require("../forms/jobtype");
import { browserHistory } from 'react-router';

var NewServicePage = React.createClass({
  handleCreate() {
    browserHistory.push("/app/services");
  },

  render() {
    return(<ServiceForm onCreate={this.handleCreate}/>);
  }
});

module.exports = NewServicePage;
