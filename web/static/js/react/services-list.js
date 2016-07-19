var Service = require("./service");
import _ from "lodash";

var ServicesList = React.createClass({
  render() {
     var services = this.props.services.map(function(service, index) {
       return(<Service service={service}/>);
     });

    return(
      <div className="services">
        {services}
      </div>
    );
  },
});

module.exports = ServicesList;
