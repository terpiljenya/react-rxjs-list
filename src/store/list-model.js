var _ = require('lodash');

var state = {
  items: {
    '1': {
      id: 1,
      name: 'Item 1.',
      favorite: false
    },
    '2': {
      id: 2,
      name: 'Item 2.',
      favorite: true
    },
    '3': {
      id: 3,
      name: 'Item 3.',
      favorite: false
    },
    '4': {
      id: 4,
      name: 'Item 4.',
      favorite: false
    },
    '5': {
      id: 5,
      name: 'Item 5.',
      favorite: false
    }
  }
};

function updateItem(id, updates) {
  console.log(id, updates);
  state.items[id] = _.assign(state.items[id], updates);
}

function removeItem(id) {
  delete state.items[id];
}

function getSelected(){
  return _.filter(state.items, 'selected');
}

function toogleItems(items) {
  items.forEach((item) => updateItem(item.id, {favorite: !item.favorite, selected: false}));
}

function removeItems(items) {
  items.forEach((item) => removeItem(item.id));
}

function getState() {
  return state;
}


module.exports = {
  updateItem: updateItem,
  removeItem: removeItem,
  getSelected: getSelected,
  toogleItems: toogleItems,
  removeItems: removeItems,
  getState: getState
};
