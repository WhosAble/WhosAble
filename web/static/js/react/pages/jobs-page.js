var CreateJobBtn = require("../create-job-btn");
var NavBar = require("../nav-bar");

var JobsPage = React.createClass({
  render() {
    return(
      <div>
        <NavBar/>
        <div className="container">
          <main role="main">
            <CreateJobBtn/>
          </main>
        </div>
      </div>
    );
  }
});

module.exports = JobsPage;