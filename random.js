/*
Random Noise Generator

Produces random noise to contrast the difference between the results from
the markov chain and pure randomness.

Syntax: node random.js --ticks 500 --startprice 50 --out out/out.csv
*/
var rand = exports;

var argv = require("minimist")(process.argv.slice(2));

var ticks = 50000;
var startPrice = 50;
var volatility = .005;
var outCsv = "out/out.csv";

if(argv.ticks){
  ticks = argv.ticks;
}

if(argv.startprice){
  startPrice = argv.startprice;
}

if(argv.out){
  outCsv = argv.out;
}

var output = require("./output");

var direction;
var curPrice = startPrice;

output.init(outCsv).then(fd=>{
  iter(fd, startPrice, 0, ticks);
});

var iter = (fd, curPrice, i, ticks)=>{
  if(ticks <= i){
    console.log("Simulation Complete.");
    process.exit(0);
  }

  if(Math.random() > .5){
    direction = -1;
  }else{
    direction = 1;
  }

  curPrice = curPrice * 1+(direction * volatility);

  output.write(fd, curPrice, i).then(()=>{
    iter(fd, curPrice, i+1, ticks);
  });
}
