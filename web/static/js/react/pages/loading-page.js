var LoadingEllipsis = require('../loading-ellipsis');

var LoadingPage = React.createClass({
  render() {
    return(
      <div id="main-container">
        <h1>
          <LoadingEllipsis>
            Loading
          </LoadingEllipsis>
        </h1>
      </div>
    );
  }
});

module.exports = LoadingPage;
