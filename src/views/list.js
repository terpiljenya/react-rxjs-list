var React = require('react');

var Intent = require('../intent');
var Item = require('./item');
var Controls = require('./controls');

class List extends React.Component {

  constructor() {
    super();

    this.handleGroupeToogleFavorite = function () {
      Intent.groupeToogleFavorite();
    };
    this.handleGroupeRemove = function () {
      Intent.groupeRemove();
    };
  }

  render() {
    var listNodes = [],
        items = this.props.items,
        someoneSelected = false;

    for (var key in items) {
      listNodes.push(<Item key={key} item={items[key]}/>);
      if (items[key].selected){
        someoneSelected = true;
      }
    }
    return (
      <div className="">
        <p>
          {(someoneSelected
            ? <Controls favoriteHandler={this.handleGroupeToogleFavorite} removeHandler={this.handleGroupeRemove}/>
            : '')}
        </p>
        <table className="table">
          <tbody>
            { listNodes }
          </tbody>
        </table>
      </div>
    );
  }
}

module.exports = List;
