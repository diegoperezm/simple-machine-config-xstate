const     fs = require("fs");
const    { Machine, actions, interpret, assign, send, sendParent } = require('xstate');
const     jison = require("jison");
const     bnf = fs.readFileSync('grammar.jison', 'utf8');
const     parser = new jison.Parser(bnf);

function exec(input) {
    return parser.parse(input);
}

let z  =
`
initial:  GREEN

context:
    color: ""

  GREEN      time     YELLOW   :setcolorgreen
                               :displaycolor

  YELLOW     time     RED      :setcoloryellow
                               :displaycolor

  RED        time     GREEN    :setcolorred
                               :displaycolor
 `;


let a  = exec(z);

const trafficLight = Machine(
  a,
 {actions: {
    displaycolor: displaycolor,
    setcolorgreen: setcolorgreen,
    setcoloryellow: setcoloryellow,
    setcolorred: setcolorred,
}});

const  trafficLightService = interpret(trafficLight).onTransition(state => {
  //  console.log('current state', state.value);
});


function setcolorgreen(ctx) {
    return ctx.color = 'green' ;
}

function setcoloryellow(ctx) {
    return ctx.color = 'yellow' ;
}

function setcolorred(ctx) {
    return ctx.color = 'red' ;
}

function displaycolor (ctx) {
    console.log(ctx.color);
}

function timer() {
    var start = new Date().getTime(),
    elapsed = '0.0';
    setInterval( function()
    {
    var time = new Date().getTime() - start;

    elapsed = Math.floor(time / 100) / 10;
    if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }

     trafficLightService.send('time');

    }, 3000);
}

trafficLightService.start();
timer();
