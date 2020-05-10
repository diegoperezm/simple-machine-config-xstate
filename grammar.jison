/* description:  */     

%{
let initialArr =[];
let ctx        =[];
let states     =[];
let inputs     =[];
let targets    =[];
let actions    =[];
let assigns    =[];
%}

			
/* lexical grammar */
%lex

%%
\s+                       /* skip whitespace */
"initial"                 return 'INITIAL'
"context"                 return 'CONTEXT'
"assign"                  return 'ASSIGN'
[a-z]+                    return 'LOWERCASE'
[A-Z]+                    return 'UPPERCASE'
[0-9]+                    return 'NUMBER'
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


assigns
: ':' ASSIGN '(' LOWERCASE LOWERCASE ')' {$$=[$2, $4, $5]}
;

data
: '[' ']'              {$$=[[]]}
|	'"' '"'							 {$$=[""]}
|	'"' LOWERCASE '"'		 {$$=[$2]}
|	NUMBER							 {$$=[$1]}
;

mdata
: LOWERCASE ':' data    {$$=[$1,...$3]}
;

context
: CONTEXT ':' mdata              {ctx.push($3)} 
| context     mdata              {ctx.push($2)} 
| CONTEXT ':' " "              
;

initial
: UPPERCASE                   {$$=[$1]} 
| initial   '.'  UPPERCASE    {$$=[...$1, $3]} 
;

minitial
: INITIAL ':'
| minitial initial             {initialArr.push($2)}
;

input
: LOWERCASE 
;

states
: UPPERCASE     LOWERCASE  UPPERCASE             {
		                                               $$=[$1,$3];
		                                               targets.push([$1,$2]);
																									 inputs.push([$1,$2])
																									} 

| UPPERCASE '.' UPPERCASE  LOWERCASE  UPPERCASE  {
		                                               $$=[[$1,$3],$5];
																									 targets.push([$1,$4]);
																									 inputs.push([$1,$3,$4])
																									}

| states mactions {
		                 $$=[...$1,$2];
										 actions.push([...$1,$2]);
									}

| states assigns  {
		                  $$=[...$1,$2]
										  assigns.push([...$1,$2]);
									}
;


mstates
: states            {states.push($1)}  // 
| mstates states    {states.push($2)}  //
;

actions
: LOWERCASE        {$$=$1}
| ':' LOWERCASE    {$$=$2}  
;


mactions
: ':' actions        {$$=$2}
| mactions actions   {$$=[$1,$2]}
;


expressions
: minitial  context 
| expressions mstates 
{


let a = {};

    for(let i = 0 ; i < initialArr.length ; i++ ) {

		  // initial 
		  if(initialArr[i].length === 1 ) {
				a.initial =	 initialArr[i][0];
		  }
    }

    // context
    if(ctx.length > 0) {
				a.context = {};
				for(let i = 0; i < ctx.length ; i++  ){
				  a.context[ctx[i][0]] = ctx[i][1];
				}
		}    


    a.states = {};

    for(let i = 0 ; i < states.length ; i++ ) {
      
		  // atomic states
				if( !Array.isArray(states[i][0])) {
						 for(let j = 0; j < states[i].length; j++) {
					  	  a.states[states[i][j]] = {};
						  	a.states[states[i][j]].on = {};

      // inputs
					    for(let k = 0; k < inputs.length; k++) {
                if(states[i][0] === inputs[k][0]){
                 a.states[states[i][0]].on[inputs[k][1]] = {};

      // targets
 								 a.states[states[i][0]].on[inputs[k][1]].target = {}; 
                 if(states[i][0] === targets[i][0] ) {
                     a.states[states[i][0]].on[inputs[k][1]].target = targets[i][0];
								 }
	 //    actions 

		   			    }

				      }	
			      }
					
      // nested states
				} else {
						 a.states[states[i][0][0]]   = {};
             a.states[states[i][0][0]].on = {};

					  for(let k = 0; k < inputs.length; k++) {
                if(states[i][0][0] === inputs[k][0]){
                    a.states[states[i][0][0]].on[inputs[k][2]] = {};
		   			    }
				    }
			}

   }// top for

console.log("\n ------------------------------- \n");
console.log(a);
console.log(a.states);
//console.log("\n ------------------------------- \n");
console.log("initial ", initialArr );
console.log("ctx     ", ctx        );
console.log("states  ", states     );
console.log("inputs  ", inputs     );
console.log("actions ", actions    );
console.log("targets ", targets    );
console.log("assigns ", assigns    );
//console.log("B", a.states.B);
//console.log("A", a.states.A);

}

; 
