"use strict"

var Worker = require("basic-distributed-computation").Worker;
var request = require("request");
var writeMatch = /_write\/{([a-z\.A-Z0-9\/\:\-\#\+\_]+)\}/;

class Write extends Worker {
  constructor(parent){
    super("write", parent);
  }

  work(req, inputKey, outputKey){
    var match = writeMatch.exec(req.paths[req.currentIdx]);

    if(match){
      if(outputKey){
        req.body[outputKey] = match[1];
      } else {
        req.status("No output key provided");
      }
    }
    req.next();
  }
}

module.exports = Write;
