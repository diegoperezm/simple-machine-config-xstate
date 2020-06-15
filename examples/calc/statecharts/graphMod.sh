#!/bin/bash

sed -i 's/label="dot/fontcolor=orange color=orange label="dot/' graph.dot;
sed -i 's/label="zero/fontcolor=purple color=purple label="zero/' graph.dot;
sed -i 's/label="operator/fontcolor=green color=green label="operator/' graph.dot;
sed -i 's/label="number/fontcolor=red color=red label="number/' graph.dot;
#sed -i 's/label="ce/color=white  label="ce' graph.dot;
 
