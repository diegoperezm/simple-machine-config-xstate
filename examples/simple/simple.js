
const {Machine, interpret} = require('xstate');
const fs                   = require('fs');
const path                 = require('path');
const machineConf          = require('../../statecharts/index.js').machineConf;
const diagram              = fs.readFileSync(
                                path.resolve(
                                __dirname,
                                './statecharts/diagram.txt'),
                                'utf8');  

const simpleMachineConf    = machineConf(diagram);
const simpleMachine        = Machine(simpleMachineConf);
const simpleMachineService = interpret(simpleMachine);


simpleMachineService.start();
simpleMachineService.send('time');





