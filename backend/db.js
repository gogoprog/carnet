var databaseURI = "carnet";
var collections = ["users"];
var db = require("mongojs").connect(databaseURI, collections);

module.exports = db;
