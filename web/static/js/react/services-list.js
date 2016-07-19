var Service = require("./service");
import _ from "lodash";

var ServicesList = React.createClass({
  handleSelect(serviceID) {
    this.props.onSelect(serviceID);
  },

  render() {
     var services = this.props.services.map((service, index) => {
       return(<Service key={service.id} service={service} onSelect={this.handleSelect}/>);
     });

    return(
      <div className="services">
        {services}
      </div>
    );
  },
});

module.exports = ServicesList;
