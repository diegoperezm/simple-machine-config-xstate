         
const fs          = require('fs');
const path        = require('path');
const statecharts = require('../../../statecharts/client.js'); 
const options     = {outputType: "dot"};
const diagram     = fs.readFileSync(path.resolve(__dirname, './diagram.txt'),'utf8');

const stateMachineConf = statecharts(diagram,{actions: {}}, options);

const stateMachine  = JSON.stringify(stateMachineConf);
let text = `const toggleConf = ${stateMachine};`;

fs.writeFileSync(
  path.resolve(__dirname, '../js/stateMachine.js'),
  text,
  'utf8');
