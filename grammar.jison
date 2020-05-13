		/* description:  */

%{
let z          ={};
z.initial      ="";
z.context      ={};
z.states       ={};
%}


/* lexical grammar */
%lex

%%
\s+                       /* skip whitespace */
"*"                       return 'INITIAL'
"context"                 return 'CONTEXT'
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

data
: '[' ']'              {$$=[[]]}
| '"' '"'              {$$=[""]}
| '"' LOWERCASE '"'    {$$=[$2]}
| NUMBER               {$$=[$1]}
;

mdata
: LOWERCASE ':' data    {$$=[$1,...$3]}
;

context
: 
| CONTEXT ':'
| context   mdata {z.context[$2[0]] = $2[1]}
;

states
: INITIAL    UPPERCASE   LOWERCASE  UPPERCASE  {
   z.initial = $2

   if(z.states[$2] != undefined) {
    z.states[$2].on[$3] = {};
    z.states[$2].on[$3].target = $4;
   }else {
    z.states[$2] = {};
    z.states[$2].on = {};
    z.states[$2].on[$3] = {};
    z.states[$2].on[$3].target = $4;
  }

	 }
| UPPERCASE   LOWERCASE  UPPERCASE
{
  if(z.states[$1] != undefined) {
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
{
		// TODO
}
| INITIAL UPPERCASE     LOWERCASE  UPPERCASE  mactions
{
  z.initial = $2; 
  if(z.states[$2] != undefined) {
   z.states[$2].on[$3] = {};
   z.states[$2].on[$3].target = $4;
   z.states[$2].on[$3].actions = $5;

  }else {
   z.states[$2] = {};
   z.states[$2].on = {};
   z.states[$2].on[$3] = {};
   z.states[$2].on[$3].target = $4;
   z.states[$2].on[$3].actions = $5;
  }
}
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
| UPPERCASE '.' UPPERCASE  LOWERCASE  UPPERCASE  mactions
{
		// TODO
}
;

mstates
: states
| mstates states
;

actions
: LOWERCASE        {$$=$1}
| ':' LOWERCASE    {$$=$2}
;


mactions
: ':' actions       {
  $$=[$2].reduce((acc,val) => acc.concat(val),[]);
}
| mactions actions  {
  $$=[$1,$2].reduce((acc,val) => acc.concat(val),[]);
}
;


expressions
: context mstates
{
console.log('\nSTART--------------------------');
console.log(z);
console.log('\n--------------------------');
//console.log('GREEN',z.states.GREEN);
console.log('GREEN',z.states.GREEN.on);
console.log('YELLOW',z.states.YELLOW.on);
console.log('RED',z.states.RED.on);
console.log('\n--------------------------END');
return z;
}
;
