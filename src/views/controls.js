var React = require('react');

class Controls extends React.Component{

  constructor() {
    super();
  }

  render() {
    return (
      <div className="btn-group">
        <button onClick={this.props.favoriteHandler} className="btn btn-default btn-sm" aria-label="Favorite">
          <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
        </button>
        <button onClick={this.props.removeHandler} className="btn btn-default btn-sm" aria-label="Remove">
          <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
        </button>
      </div>
    );
  }

}

module.exports = Controls;
