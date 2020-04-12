/* description:  */     

%{
let ctx =[];
let states =[];
let actions= [];
%}

			
/* lexical grammar */
%lex

%%
\s+                       /* skip whitespace */
"initial"                 return 'INITIAL'
"context"                 return 'CONTEXT'
[a-z]+                    return 'LOWERCASE'
[A-Z]+                    return 'UPPERCASE'
":"                       return ':'
"."                       return '.'
'"'                       return '"'
"$"                       return '$'
","                       return ','
"("                       return '('
")"                       return ')'
"["                       return '['
"]"                       return ']'
"E"                       return 'E'
//<<EOF>>                 return 'EOF'

/lex



%start expressions

%% /* language grammar */

data
  : LOWERCASE ':'  '[' ']'        {$$=[$1,[]]}
  | LOWERCASE ':'  '"' '"'        {$$=[$1,""]}
  ;

context
  : CONTEXT ':' data              { ctx.push($3)} 
  | context     data              { ctx.push( $2)} 
  ;

initial
: INITIAL  ':' UPPERCASE  {$$=$3}
;

states
: UPPERCASE  LOWERCASE  '$'                            {$$=[$1,$2]} 
| UPPERCASE  LOWERCASE  UPPERCASE                      {$$=[$1,$2,$3]} 
| UPPERCASE '.' UPPERCASE  LOWERCASE  UPPERCASE        {$$=[$1,$2,$3,$4,$5]}
| states actions                                       {$$=[...$1,$2]}
;

mstates
: states             {states.push($1)}  
| mstates states     {states.push($2)}  
;

actions
: ':' LOWERCASE      {$$=$2} 
;


expressions
: initial context  mstates    {

    let f = {};
    let initial = {initial: $1};
    
    let c =  ctx.reduce((acc, curr) => {
	    let a = curr[0];
	    acc[a] = curr[1];
	    return acc;
	}, {}); 

    let d = {};

    d.context = c;


    let acc = {};

    for(let i = 0; i< states.length; i++){
	/* // nested states
	if(states[i][1] === '.') {
          let statename = states[i][0]
	  let input = states[i][2];
	  let next = states[i][3];
	  let h= { [input]: {target: next}}
          acc[statename]  = h;
 
	} else
        */
	  if(states[i].length < 4){
          let statename = states[i][0]
	  let input = states[i][1];
	  let next = states[i][2];
	  let hh = {};
 	  let h= { [input]: {target: next}}
	  hh.on = h;
          acc[statename]  = hh;
                 
        } else if(states[i].length >= 4) {
          let statename = states[i][0]
	  let input = states[i][1];
	  let next = states[i][2];
	  let actions = []

	   for(let j = 3; j < states[i].length ; j++) {
		actions.push(states[i][j]);
	 }
          let hh = {};
	  let h = {[input]: {target: next, actions : actions}} 
	   hh.on = h;
           acc[statename]  = hh;
        }
	  
    }


    let ee = {};
    ee.states = acc; 
  
    dd = Object.assign(f, initial, d,ee );
  
    return dd;
    }
   ; 
