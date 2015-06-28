var Rx = require('rx');

var Keys = require('./keys');

var actionStream = new Rx.Subject();

module.exports = {
  actionStream: actionStream,

  /**
   * Toggle single item is favorite
   * @param  {object} item
   */
  toggleFavorite: function(item) {
    var id = item.id;
    var actionType = item.favorite ?
        Keys.UNFAVORITE :
        Keys.FAVORITE;

    actionStream.onNext({
      action: actionType,
      id: id
    });
  },

  /**
   * Toggle single item is selected
   * @param  {object} item
   */
  toggleSelect: function(item) {
    var id = item.id;
    var actionType = item.selected ?
        Keys.UNSELECT :
        Keys.SELECT;

    actionStream.onNext({
      action: actionType,
      id: id
    });
  },

  /**
   * Remove item
   * @param  {number} id
   */
  remove: function (id) {
    actionStream.onNext({
      action: Keys.REMOVE,
      id: id
    });
  },

  /**
   * Toggle group of items favorites
   */
  groupeToogleFavorite: function () {
    actionStream.onNext({
      action: Keys.GROUPE_TOOGLE_FAVORITE
    });
  },

  /**
   * Remove group of items
   */
  groupeRemove: function () {
    actionStream.onNext({
      action: Keys.GROUPE_REMOVE
    });
  }
};
