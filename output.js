"use strict";
/*
Markov Walk Outputter

Writes the results of the random walk to csv.
*/
var fs = require("fs");

var Promise = require("bluebird");
Promise.onPossiblyUnhandledRejection(function(error){
    throw error;
});

var output = exports;

//sets up the csv header for the file and returns the file descriptor.
output.init = outfile=>{
  return new Promise((f,r)=>{
    fs.open(outfile, "w", (err, fd)=>{
      fs.appendFile(fd, "index, price\n", (err, res)=>{
        f(fd);
      });
    });
  });   
}

output.write = (fd, price, index)=>{
  return new Promise((f,r)=>{
    fs.appendFile(fd, `${index}, ${price}\n`, (err, res)=>{
      f();
    });
  });
}
