# Generates one chain, dumps results to csv, plots, and stores as a png.
# Syntax: ./run.sh [incsv] [outpng] [ticks] [startprice] [silent]
# ./run.sh with no parameters uses default values
# ./run.sh --silent will run without displaying png

#TODO: Convert to proper argument parsing

SILENT=no

if ((!$#)); then
  TICKS=50000
  STARTPRICE=50
  INCSV=out.csv
  OUTPNG=out.png
  SILENT=no
else
  if [ "$1" == "--silent" ]
    then
      TICKS=50000
      STARTPRICE=50
      INCSV=out.csv
      OUTPNG=out.png
      SILENT=yes
  else
    INCSV=$1
    OUTPNG=$2
    TICKS=$3
    STARTPRICE=$4
    SILENT=$5
  fi
fi

node index.js --ticks=${TICKS} --startprice ${STARTPRICE} -o $INCSV
sh plot.sh $INCSV $OUTPNG
if [ "$SILENT" == "no" ]
  then
    eog out.png
fi
