#!/bin/bash

function uglifyAllJSONInDir(){
  for file in $(find $1 -iname '*.json');do
    tmpfile=${file}.tmp
    cat $file | jq -c > $tmpfile
    rm $file
    mv $tmpfile $file
  done
}

