const { assign } = require('xstate');


let actions = {
		actions: {
				increment: assign({count: ctx =>  ctx.count + 1 }),
				decrement: assign({count: ctx =>  ctx.count - 1 })
	}
};




module.exports = actions;
