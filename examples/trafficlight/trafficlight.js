const fs          = require('fs');
const path        = require('path');
const {interpret} = require('xstate');
const statecharts = require('../../statecharts/index.js'); 
const actions     = require('./statecharts/actions.js');
const options     = {outputType: "dot"};
const diagram     = fs.readFileSync(path.resolve(__dirname, './statecharts/diagram.txt'),'utf8'); 


function trafficlight(input) {
  const tlMachine = statecharts(diagram,actions,options);
	const tlService = interpret(tlMachine);
	tlService.start();
	time(tlService); 
}

function time(tlService ) {
  let start   = new Date().getTime();
  let elapsed = '0.0';
	setInterval( function ()
  {
    let  time = new Date().getTime() - start;
    elapsed = Math.floor(time / 100) / 10;
			if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }
			tlService.send('time');  
    }, 1000);
};

trafficlight();
