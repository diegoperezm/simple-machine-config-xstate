let actions = {
		actions: {
				increment: increment,
				decrement: decrement 
	}
};

function increment(ctx) {
		return ctx.count = ctx.count + 1; 
}

function decrement(ctx) {
		return ctx.count = ctx.count - 1; 
    
}




module.exports = actions;
