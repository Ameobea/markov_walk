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
markov.config = {
  up: {
    up: .8,
    same: .15,
    down: .05
  }, same: {
    up: .15,
    same: .7,
    down: .15
  }, down: {
    up: .05,
    same: .15,
    down: .8
  }
};

markov.chooseState = state=>{
  var chance = Math.random();
  var prob = markov.config[state];

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
};

//TODO: Add custom config insertion from file that verifies config settings to be sane.

//simulates a 'link' of the chain and returns a new price and state.
markov.step = (price, state)=>{
  var state = markov.chooseState(state); //mutate state based on probability matrix

  //TODO: Change multipliers to be determined by makov chains as well.
  if(state == "up"){
    price = price * 1.005;
  }else if(state == "same"){
    price += (.5 - Math.random());
  }else if(state == "down"){
    price = price * .995;
  }

  state = markov.chooseState(state);

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

