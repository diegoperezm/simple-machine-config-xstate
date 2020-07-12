#!/bin/bash
jison grammarDagreD3.jison; jison grammarXstate.jison;
for example in `ls ../examples/browser/` ; do cp ./grammarDagreD3.js ./grammarXstate.js ../examples/browser/$example/js/; done;



