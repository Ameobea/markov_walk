"use strict";
/*
Markov Random Walk

Generates a random price walk with the starting parameters and outputs the results
to a csv file.

********************Arguments********************
--ticks=10000 //how many iterations to simulate
--startprice=50 //starting price of the asset
-o ./res.csv //location of the output csv
--startingstate=same //starting state; up, same, or down
*************************************************

Casey Primozic
*/
var argv = require("minimist")(process.argv.slice(2));

var Promise = require("bluebird");
Promise.onPossiblyUnhandledRejection(function(error){
    throw error;
});

var markov = require("./markov");
var output = require("./output");

//defaults
var ticks = 10000;
var startPrice = 50;
var outfile = "./out.csv";
var startingState = "same";

if(argv.ticks){
  ticks = argv.ticks;
}

if(argv.startprice){
  startPrice = argv.startprice;
}

if(argv.o){
  outfile = argv.o;
}

if(argv.startingstate){
  startingState = argv.startingstate;
}

var state = [startPrice, startingState];

output.init(outfile).then(fd=>{
  markov.walk(state, ticks, fd);
});
