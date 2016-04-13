"use strict";
/*
Markov Walk

Given a price and condition, will return a new price and
condition with given probability table.
*/
var Promise = require("bluebird");

Promise.onPossiblyUnhandledRejection(function(error){
    throw error;
});

var output = require("./output");

var markov = exports;

//default config
markov.stateMatrix = {
  up: {
    up: .7,
    same: .25,
    down: .05
  }, same: {
    up: 0.1,
    same: 0.8,
    down: 0.1
  }, down: {
    up: .05,
    same: .25,
    down: .7
  }
};

markov.volatilityMatrix = {
  up: {
    up: .7,
    same: .25,
    down: .05
  }, same: {
    up: 0.1,
    same: 0.8,
    down: 0.1
  }, down: {
    up: .05,
    same: .25,
    down: .7
  }
}

//returns the next state given a matrix and current state
markov.choose = (matrix, state)=>{
  var chance = Math.random();
  var prob = matrix[state];

  if(chance >= prob.up + prob.same){
    return "down";
  }else if(chance >= prob.up){
    return "same";
  }else if(chance < prob.up){
    return "up";
  }else{
    console.log("Error - probabilities do not add up.");
    pricess.exit(1);
  }
}

//TODO: Add custom config insertion from file that verifies config settings to be sane.

//simulates a 'link' of the chain and returns a new price and state.
markov.step = (price, state, volatility)=>{
  state = markov.choose(markov.stateMatrix, state); //mutate state based on probability matrix

  if(typeof volatility == "undefined"){
      volatility = .0001;
  }

  if(state == "up"){
    price = price * (1+volatility);
  }else if(state == "same"){
    var multiplier = 1;
    if(Math.random() > .5){
      multiplier = -multiplier;
    }

    price = price * 1+(volatility*multiplier);
  }else if(state == "down"){
    price = price * (1 - volatility);
  }

  return [price, state];
};

//simulates `ticks` ticks of the chain.
markov.walk = (state, ticks, fd, i)=>{
  if(!i){
    i = 0;
  }else if(i >= ticks){
    console.log("All ticks simulated");
    //TODO: Run R script and display
    process.exit(0);
  }

  var state = markov.step.apply(null, state);
  output.write(fd, state[0], i).then(()=>{
    markov.walk(state, ticks, fd, i+1);
  });
}

markov.volatilityStep = (volatility, state)=>{

}
