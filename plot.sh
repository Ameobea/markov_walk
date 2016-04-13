# Plots the result of a chain simulation stored in a csv.
# Syntax: ./plot.sh [inputcsv] [outputpng]
# ./plot.sh with no arguments will default to ./plot.sh out.csv out.png

if [ -z "$1" ]
  then
    INCSV=out.csv
    OUTPNG=out.png
else
  INCSV=$1
  OUTPNG=$2
fi

Rscript plot.R $INCSV $OUTPNG
