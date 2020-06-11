         
const fs          = require('fs');
const path        = require('path');
const statecharts = require('../../../statecharts/index.js').machineConf; 

const diagram     = fs.readFileSync(
		                  path.resolve(__dirname,
	  								  './diagram.txt'),
		                  'utf8');


const stateMachineConf = statecharts(diagram);

const stateMachine  = JSON.stringify(stateMachineConf);
let text = `const toggleConf = ${stateMachine};`;

fs.writeFileSync(
  path.resolve(__dirname, '../js/stateMachine.js'),
  text,
  'utf8');

