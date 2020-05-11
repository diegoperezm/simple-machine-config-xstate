		/* description:  */     

%{
let initialArr =[];
let ctx        =[];
let states     =[];
let inputs     =[];
let targets    =[];
let actions    =[];
let assigns    =[];
let z          ={};
z.initial      ="";
z.context      ={};
z.states       ={};
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

initial
: INITIAL ':'
| initial UPPERCASE            {z.initial = $2}
;

context
: CONTEXT ':' mdata       {z.context[$3[0]] = $3[1]; } 
| context     mdata       {z.context[$2[0]] = $2[1]; }
| CONTEXT ':' " "              
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

states
: UPPERCASE   LOWERCASE  UPPERCASE {
		if(z.states[$1] != undefined) {
				console.log($1,$2);
        z.states[$1].on[$2] = {};
        z.states[$1].on[$2].target = $3;
		}else {
		z.states[$1] = {};
		z.states[$1].on = {};
    z.states[$1].on[$2] = {};
    z.states[$1].on[$2].target = $3;
		}
 }

| UPPERCASE '.' UPPERCASE  LOWERCASE  UPPERCASE

| UPPERCASE     LOWERCASE  UPPERCASE  mactions
{
		if(z.states[$1] != undefined) {
      z.states[$1].on[$2] = {};
      z.states[$1].on[$2].target = $3;
      z.states[$1].on[$2].actions = $4;

		}else {
		  z.states[$1] = {};
		  z.states[$1].on = {};
      z.states[$1].on[$2] = {};
      z.states[$1].on[$2].target = $3;
      z.states[$1].on[$2].actions = $4;
		}
 }


}

| UPPERCASE '.' UPPERCASE  LOWERCASE  UPPERCASE  mactions {
                                                  $$=[[$1,$3],$5];
}

| UPPERCASE     LOWERCASE  UPPERCASE  assigns            {assigns.push([$1,$2,$3,$4])}
| UPPERCASE '.' UPPERCASE  LOWERCASE  UPPERCASE  assigns {assigns.push( [$1,$3,$4,$5,$6])}
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
: initial  context //: minitial  context 
| expressions mstates 
{


console.log("\n ------------------------------- \n");
console.log("\n", z);
console.log("\n", z.states.A);
console.log("\n", z.states.B);
//console.log("\n",a);
//console.log("\n",a.states);
//console.log("\n B",a.states.B);
//console.log("\n",a.states.B.on);
//console.log("\n click", a.states.B.on.click);
//console.log("\n clock", a.states.B.on.clock);
console.log("\n ------------------------------- \n");
//console.log("initial ", initialArr );
//console.log("ctx     ", ctx        );
//console.log("\nstates  ", states     );
//console.log("\ninputs  ", inputs     );
//console.log("\nactions ", actions    );
//console.log("\ntargets ", targets    );
//console.log("assigns ", assigns    );
//console.log("B", a.states.B);
//console.log("A", a.states.A);
console.log("\n ------------------------------- \n");
//console.log("\n", z);
}
; 
