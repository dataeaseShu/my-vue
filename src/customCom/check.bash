#!/bin/bash
for f in `find . -name "*.vue"`
do filename=`echo $f | awk -F'/' '{print $NF}'`
 if [[ "$filename" =~ ^[a-z].* ]] && [[ "$filename" != "index.vue" ]]; then
  echo $f;
  IFS='/' #setting comma as delimiter  
  read strarr <<<"$f" #reading str as an array as tokens separated by IFS
  lang=""  
  #for loop for reading the list  
  for value in $strarr;  
  do
  fk="lkk"
  gg=`echo ${fk} | tr [a-z] [A-Z]`
  lang+="/$value"  #Combining the list values using append operator  
  lang+="/$gg"  #Combining the list values using append operator  
  done  
  #Printing the combined values  
  echo "$lang oooo"
  echo "dba : ${strarr[0]}" 
 fi
done
