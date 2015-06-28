var React = require('react');
var classNames = require('classnames');

var Intent = require('../intent');
var Controls = require('./controls');

class Item extends React.Component {

  constructor() {
    super();

    this.handleToogleFavorite = () => {
      Intent.toggleFavorite(this.props.item);
    };
    this.handleToogleSelect = () => {
      Intent.toggleSelect(this.props.item);
    };
    this.handleRemove = () => {
      Intent.remove(this.props.item.id);
    };
  }

  render() {
    return (
      <tr className={classNames({
            'info': this.props.item.favorite
          })}>
          <td width="10px">
            <input type="checkbox" checked={this.props.item.selected} onChange={this.handleToogleSelect}/>
          </td>
          <td className="lead">
            {this.props.item.name}
          </td>
          <td width="85px" className="text-right">
            <Controls favoriteHandler={this.handleToogleFavorite} removeHandler={this.handleRemove}/>
          </td>
      </tr>
    );
  }
}

module.exports = Item;
