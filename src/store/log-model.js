
var log = [];


function getLog() {
  return log;
}

function addRecord(text){
  log.push(text);
}


module.exports = {
  getLog: getLog,
  addRecord: addRecord
};
