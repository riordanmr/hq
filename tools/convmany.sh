#!/bin/sh
SRCDIR="/Users/mrr/Pictures/Houses/6322Inner"
TARGDIR="/Library/WebServer/Documents/hq/images/6322 Inner"

if [ ! -d "$SRCDIR" ]
then
    echo "Source dir ${SRCDIR} does not exist"
    exit
fi
if [ ! -d "${TARGDIR}" ]
then
    echo "Target directory ${TARGDIR} does not exist"
#exit
fi

pushd "${SRCDIR}"
NFILES_CONV=0
for lfn in *.jpg
do
    convert "${lfn}" -resize 640x480 -quality 85 "${TARGDIR}/${lfn}"
    NFILES_CONV=`expr $NFILES_CONV + 1`
done
echo $NFILES_CONV files converted.
popd
