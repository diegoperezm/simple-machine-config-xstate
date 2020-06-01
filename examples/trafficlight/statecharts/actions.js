const {assign} = require('xstate');

actions = {
   actions: {
    displaycolor: ctx => console.log(ctx.color),
    setcolorgreen:assign({color:()=> "green"}),	
    setcoloryellow:assign({color:()=> "yellow"}),	
    setcolorred:assign({color:()=> "red"}),	
   }
};

module.exports = actions;
