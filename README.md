# Markov Random Walk Financial Market Simuations
This is a test to see if the movements of prices in financial markets can be approximated by Markov Chains.  

Three market states are assumed: up, sideways, and down.  Each 'tick,' or price update, a Markov chain is used to determine if the price should increase, decrease, or stay (mostly) the same.  

## Installation and Requirements
Nodejs is used to calculate the markov chains and the results are spit out into a csv.  This CSV is then parsed by an R script into a nice PNG.  The ggplot2 R library is used to plot and save the images.  The shell scripts rely on the Linux `eog` command to display the plots.

### Usage
To calculate a new markov chain using the default settings, run `sh run.sh`.  To tweak the input matrix for the chain or change other settings, view the source code in `index.js`, `plot.js`, and `markov.js` for reference.

### Installation
1. `npm install`
2. From the R command line, run `install.packages("ggplot2")`.

## Notes and Observations
After *VERY* prelimenary testing, it the resulting plots are actually shocking similar to actual foreign exchange charts.  The scale is completely wrong, but the data is right.  

I can even pick out stuff like price channels, double bottoms, and other technical formations that traders rely on.  This begs the question of whether these indicators actually mean anything or are simply artifacts of noise.  

Or perhaps the difference is that this is *predictably* random noise, and the reason technical analysis works at all is due to the fact that market data is not truly random.

### Purely Random Data
After comparing the data generated by the markov chain to purely random data, the results were very surprising.  I expected a heavily mean-reverting result without any trend to speak of.  However, the results were actually VERY similar to what was produced by the markov chain.  

This indicates that perhaps random data has more discernable patterns than originally anticipated.  I expect that this is due to the fact that the changes in price are produced via multiplication rather than by addition.  I picked multiplication due to the fact that I'm used to market moves being measured in percents rather than dollars or cents.  

Further investigation will be required to determine if random data really does match up to real market conditions.  I've read about "fat-tail distribution" which supposedly is why algorithmic trading strategies work.  

However, this doesn't account for stuff like price channels, double tops/bottoms, flags, pennants, and other formations that occur with amazing frequency in real markets as well as markov chain results.  If they also occur in the random data with similar frequency, this will raise serious questions as to the validity of similar technical trading strategies.  
