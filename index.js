var mongoose = require("mongoose");
var fs = require("fs");
var moment = require("moment");
var db = mongoose.createConnection("mongodb://localhost:27017/testdata");
var cat = new mongoose.Schema({
    name : String
});

var model = db.model("cat", cat);

mongoose.set('debug', function(coll, method, query, doc){
    var str = JSON.stringify({
            coll : coll,
            method : method,
            query : query,
            doc : doc,
        });
    fs.appendFile("./mongodb.log", moment().format("YYYY-MM-DD A hh:ss:mm") + str + "\n", function(err){
        console.log("save");
    });
});

model({name : "nico"}).save();
model({name : "mimi"}).save();
model.find(function(err, cats){

    console.log(cats);
});
