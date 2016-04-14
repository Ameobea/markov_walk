# Generates many chains and plots them all, saving them all as pngs.
# Syntax: ./multi.sh [n] [ticks] [incsv] [outbase] [startprice]

if ((!$#)); then
  ITERS=5
  TICKS=50000
  INCSV=out/out.csv
  OUTBASE=out/out
  STARTPRICE=50
else
  ITERS=$1
  TICKS=$2
  INCSV=$3
  OUTBASE=$4
  STARTPRICE=$5
fi

for (( i=1; i<=$ITERS; i++ ))
do
  ./run.sh $INCSV ${OUTBASE}${i}.png $TICKS $STARTPRICE yes
done

eog ${OUTBASE}*.png
