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
"initial"                 return 'INITIAL'
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


initial
: INITIAL ":" UPPERCASE       {z.initial = $3}
;

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
: UPPERCASE   LOWERCASE  UPPERCASE
{
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
{
		// TODO
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

   if( Array.isArray($4[0])) {
    let aaa = $4[0].reduce((acc,val) => acc.concat(val), []);
    aaa.push($4[1])
     z.states[$1].on[$2].actions = aaa;
   }else {
     z.states[$1].on[$2].actions = $4;
   }
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
: ':' actions       {$$=$2}
| mactions actions  {$$=[$1,$2]}
;

expressions
: initial  context mstates
{
return z;
}
;
