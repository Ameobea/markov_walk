# Saves a plot of the markov chain results.

# Syntax: Rscript plot.R out.csv out.png

library("ggplot2")

args <- commandArgs(trailingOnly = TRUE)
csvname <- args[1]
pngname <- args[2]

df <- read.csv(csvname, header=TRUE)

ggplot(data=df, aes(x=index, y=price)) + geom_line()

ggsave(filename = pngname, plot = last_plot(), scale=1)

print(paste("image output to", pngname, sep=" "))
