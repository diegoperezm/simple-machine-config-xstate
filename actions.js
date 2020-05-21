let actions = {
		actions: {
				display: display,
				assigncolorgreen:  assigncolorgreen,
				assigncoloryellow: assigncoloryellow,	
				assigncolorred: assigncolorred
		}
};

function display () {}

function assigncolorgreen(ctx) {
		return ctx.color = 'green';
}

function assigncoloryellow(ctx) {
		return ctx.color = 'yellow';
}

function assigncolorred(ctx) {
		return ctx.color = 'red';
}

module.exports = actions;
