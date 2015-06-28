var React = require('react');

class Console extends React.Component{

  constructor() {
    super();
  }

  render() {
    var log = this.props,
        logList = [];
    for (var key in log) {
      logList.push(<div className="small" key={key}> { log[key] } </div>);
    }
    return (
      <div>
        <h3>Log:</h3>
        <div>
          { logList }
        </div>
      </div>
    );
  }

}

module.exports = Console;
