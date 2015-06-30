var Rx = require('rx');
var _ = require('lodash');

var Keys = require('./keys');
var Intent = require('./intent');
var {updateItem, removeItem, getSelected, toogleItems, removeItems, getState} = require('./store/list-model');
var {getLog, addRecord} = require('./store/log-model');

var stateStream = new Rx.ReplaySubject(1);
var logStream = new Rx.ReplaySubject(1);

var listDispatcher = function (payload) {
  var selectedItems;
  switch(payload.action) {
    case Keys.FAVORITE:
      updateItem(payload.id, {favorite: true});
      stateStream.onNext(getState());
      break;
    case Keys.UNFAVORITE:
      updateItem(payload.id, {favorite: false});
      stateStream.onNext(getState());
      break;
    case Keys.SELECT:
      updateItem(payload.id, {selected: true});
      stateStream.onNext(getState());
      break;
    case Keys.UNSELECT:
      updateItem(payload.id, {selected: false});
      stateStream.onNext(getState());
      break;
    case Keys.REMOVE:
      removeItem(payload.id);
      stateStream.onNext(getState());
      break;
    case Keys.GROUPE_TOOGLE_FAVORITE:
      selectedItems = getSelected();
      payload.ids = _.pluck(selectedItems, 'id');
      toogleItems(selectedItems);
      stateStream.onNext(getState());
      break;
    case Keys.GROUPE_REMOVE:
      selectedItems = getSelected();
      payload.ids = _.pluck(selectedItems, 'id');
      removeItems(selectedItems);
      stateStream.onNext(getState());
      break;
    default:
      console.warn(`${payload.action} not recognized in list model.`);
  }
  return payload;
};

Intent.actionStream.subscribe(listDispatcher);

var logDispatcher = function (payload) {
  switch(payload.action) {
    case Keys.FAVORITE:
    case Keys.UNFAVORITE:
    case Keys.SELECT:
    case Keys.UNSELECT:
    case Keys.REMOVE:
      addRecord(payload.action + ' id=' + payload.id);
      logStream.onNext(getLog());
      break;
    case Keys.GROUPE_TOOGLE_FAVORITE:
    case Keys.GROUPE_REMOVE:
      addRecord(payload.action + ' ids=' + payload.ids.join(', '));
      logStream.onNext(getLog());
      break;
    default:
      console.warn(`${payload.action} not recognized in log model.`);
  }
};

Intent.actionStream.subscribe(logDispatcher);

//init
stateStream.onNext(getState());
logStream.onNext(getLog());

module.exports = {
  stateStream: stateStream,
  logStream: logStream
};
