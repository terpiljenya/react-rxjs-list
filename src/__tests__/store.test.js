var rewire = require("rewire");
var Keys = require("../keys");
var _ = require('lodash');


describe("ListStore", function () {
  var List, listDispatcher;
  beforeEach(function () {
    List = require("../store/list-model");
    listDispatcher = rewire('../dispatcher').__get__("listDispatcher");
  });

  it("should init with 5 items", function () {
    expect(Object.keys(List.getState().items).length).toBe(5);
  });

  it("should removes item", function () {
    listDispatcher({
      action: Keys.REMOVE,
      id: 3
    });
    expect(_.size(List.getState().items)).toBe(4);
    expect(List.getState().items[3]).toBeUndefined()
  });

  it("should favorite item", function () {
    listDispatcher({
      action: Keys.FAVORITE,
      id: 1
    });
    expect(List.getState().items[1].favorite).toBeTruthy();
  });

  it("should unfavorite item", function () {
    listDispatcher({
      action: Keys.UNFAVORITE,
      id: 2
    });
    expect(List.getState().items[2].favorite).not.toBeTruthy();
  });

  it("should select/unselect items", function () {
    listDispatcher({
      action: Keys.SELECT,
      id: 1
    });
    listDispatcher({
      action: Keys.SELECT,
      id: 4
    });
    listDispatcher({
      action: Keys.UNSELECT,
      id: 4
    });
    listDispatcher({
      action: Keys.SELECT,
      id: 5
    });
    expect(_.size(_.filter(List.getState().items, 'selected'))).toBe(2);
  });

  it("should toogle selected items", function () {
    listDispatcher({
      action: Keys.GROUPE_TOOGLE_FAVORITE,
    });
    expect(_.size(_.filter(List.getState().items, 'favorite'))).toBe(1);
  });

  it("should remove selected items", function () {
    listDispatcher({
      action: Keys.SELECT,
      id: 1
    });
    listDispatcher({
      action: Keys.SELECT,
      id: 2
    });
    listDispatcher({
      action: Keys.GROUPE_REMOVE,
    });
    expect(_.size(List.getState().items)).toBe(2);
  });
});