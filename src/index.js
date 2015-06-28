var React = require('react');

var Dispatcher = require('./dispatcher');
var List = require('./views/list');
var Console = require('./views/console');

Dispatcher.stateStream.subscribe((appState) => {
  React.render(
    <List {...appState}/>,
    document.getElementById('list')
  );
});

Dispatcher.logStream.subscribe((action) => {
  React.render(
    <Console {...action}/>,
    document.getElementById('console')
  );
});
