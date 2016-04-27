var LoadingEllipsis = React.createClass({
  dotInterval: null,

  getInitialState() {
    return {
      dotCount: 0,
      dots: ''
    }
  },

  componentDidMount() {
    this.dotInterval = setInterval(this.updateDots, 500);
  },

  componentWillUnmount() {
    clearInterval(this.dotInterval);
  },

  updateDots() {
    var count = this.state.dotCount + 1;
    if(count >= 4) count = 0;
    var dots = ".".repeat(count);
    this.setState({dotCount: count, dots: dots});
  },

  render() {
    return(
      <span className="loading-ellipsis">
        {this.props.children || 'loading'}
        <span className="dot-holder">
          <span className="invisi-dots">...</span>
          <span className="dots">{this.state.dots}</span>
        </span>
      </span>
    );
  }
});

module.exports = LoadingEllipsis;
