#!/bin/bash

sed -i '2s/$/ rankdir=LR /' graph.dot;
sed -i 's/label=" "/weight=20  label=" "/' graph.dot;
sed -i 's/label="dot/fontcolor=orange color=orange label="dot/' graph.dot;
sed -i 's/label="zero/fontcolor=purple color=purple label="zero/' graph.dot;
sed -i 's/label="operator/fontcolor=green color=green label="operator/' graph.dot;
sed -i 's/label="number/fontcolor=grey color=grey label="number/' graph.dot;
sed -i 's/label="ce/fontcolor=black color=black label="ce/' graph.dot;
sed -i 's/label="minus/fontcolor=red color=red label="minus/' graph.dot;
sed -i '67s/fontcolor=red/weight=20 fontcolor=red/' graph.dot;
