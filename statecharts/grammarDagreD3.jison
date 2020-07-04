		/* description:  */

%{
let states = [];
let edges  = [];
%}

/* lexical grammar */
%lex

%%
\s+                       /* skip whitespace */
"*"                       return 'INITIAL'
"context"                 return 'CONTEXT'
"invoke:"                 return 'INVOKE'
"id:"                     return 'ID'
"src:"                    return 'SRC'
"ondone:"                 return 'ONDONE'
"onerror:"                return 'ONERROR'
"entry:"                  return 'ENTRY'
"exit:"                   return 'EXIT'
"final"                   return 'FINAL'
[0-9]+                    return 'NUMBER'
[a-z]+                    return 'LOWERCASE'
[A-Z0-9]+                 return 'UPPERCASE'
":"                       return ':'
'"'                       return '"'
"@"                       return '@'
"["                       return '['
"]"                       return ']'
//<<EOF>>                 return 'EOF'

/lex


%start expressions

%% /* language grammar */

data
: '[' ']'              {$$=[[]]}
| '"' '"'              {$$=[""]}
| '"' LOWERCASE '"'    {$$=[$2]}
| NUMBER               {$$=[+$1]}
;

mdata
: LOWERCASE ':' data    {$$=[$1,...$3]}
;

context
: 
| CONTEXT ':'
| context   mdata {}
;

states
: INITIAL    UPPERCASE   LOWERCASE  UPPERCASE
{
  states.push("INITIAL",$2,$4);  
  edges.push(["INITIAL",$2,""]);
  edges.push([$2,$4,$3]);
}
| INITIAL    UPPERCASE   LOWERCASE  mactions
{
  states.push("INITIAL",$2);  
  edges.push(["INITIAL",$2,""]);

}
| INITIAL    UPPERCASE   LOWERCASE  UPPERCASE mentry 
{
  states.push("INITIAL",$2,$4);  
  edges.push(["INITIAL",$2,""]);
  edges.push([$2,$4,$3]);

}
| INITIAL    UPPERCASE   LOWERCASE  UPPERCASE mexit 
{
  states.push("INITIAL",$2,$4);  
  edges.push(["INITIAL",$2,""]);
  edges.push([$2,$4,$3]);
}
| INITIAL    UPPERCASE   LOWERCASE  UPPERCASE mentry  mexit
{
  states.push("INITIAL",$2,$4);  
  edges.push(["INITIAL",$2,""]);
  edges.push([$2,$4,$3]);
}
| UPPERCASE   LOWERCASE  UPPERCASE
{
  if(!states.includes($1)) {
    states.push($1);
  }
  if(!states.includes($3)) {
    states.push($3);
  }
  edges.push([$1, $3, $2]);
}
| UPPERCASE   LOWERCASE  UPPERCASE mentry
{
  if(!states.includes($1)) {
    states.push($1);
  }
  if(!states.includes($3)) {
    states.push($3);
  }
  edges.push([$1, $3, $2]);
}
| UPPERCASE   LOWERCASE  UPPERCASE mentry mexit
{
  if(!states.includes($1)) {
    states.push($1);
  }
  if(!states.includes($3)) {
    states.push($3);
  }
  edges.push([$1, $3, $2]);
}
| UPPERCASE   LOWERCASE  UPPERCASE mexit
{
  if(!states.includes($1)) {
    states.push($1);
  }
  if(!states.includes($3)) {
    states.push($3);
  }
  edges.push([$1, $3, $2]);
}
| INITIAL UPPERCASE  mentry minvokes 
{
  states.push("INITIAL",$2);  
  edges.push(["INITIAL",$2,""]);
}
}
| INITIAL UPPERCASE  mentry minvokes mexit
{
  states.push("INITIAL",$2);  
  edges.push(["INITIAL",$2,""]);
}
| INITIAL UPPERCASE   minvokes
{
  states.push("INITIAL",$2);  
  edges.push(["INITIAL",$2,""]);
}
| INITIAL UPPERCASE   minvokes mexit
{
  states.push("INITIAL",$2);  
  edges.push(["INITIAL",$2,""]);
}
| INITIAL UPPERCASE  LOWERCASE  UPPERCASE  minvokes mexit
{
  states.push("INITIAL",$2,$4);  
  edges.push(["INITIAL",$2,""]);
  edges.push([$2,$4,$3]);
}
| INITIAL UPPERCASE  LOWERCASE  UPPERCASE  mentry minvokes
{
  states.push("INITIAL",$2,$4);  
  edges.push(["INITIAL",$2,""]);
  edges.push([$2,$4,$3]);
}
| INITIAL UPPERCASE  LOWERCASE  UPPERCASE  mentry minvokes mexit
{
  states.push("INITIAL",$2,$4);  
  edges.push(["INITIAL",$2,""]);
  edges.push([$2,$4,$3]);
}
| INITIAL UPPERCASE     LOWERCASE  UPPERCASE  mactions
{
  states.push("INITIAL",$2,$4);  
  edges.push(["INITIAL",$2,""]);
  edges.push([$2,$4,$3]);
}
| INITIAL UPPERCASE     LOWERCASE  UPPERCASE  mactions mexit
{
  states.push("INITIAL",$2,$4);  
  edges.push(["INITIAL",$2,""]);
  edges.push([$2,$4,$3]);
}
| INITIAL UPPERCASE  LOWERCASE  UPPERCASE  mentry mactions
{
  states.push("INITIAL",$2,$4);  
  edges.push(["INITIAL",$2,""]);
  edges.push([$2,$4,$3]);
}
| INITIAL UPPERCASE  LOWERCASE  UPPERCASE  mentry mactions mexit
{
  states.push("INITIAL",$2,$4);  
  edges.push(["INITIAL",$2,""]);
  edges.push([$2,$4,$3]);
}
| UPPERCASE  LOWERCASE  mactions
{
  if(!states.includes($1)) {
    states.push($1);
  }
  edges.push([$1, "", $2]);
}
| UPPERCASE  LOWERCASE  UPPERCASE  mactions
{
  if(!states.includes($1)) {
    states.push($1);
  }
  if(!states.includes($3)) {
    states.push($3);
  }
  edges.push([$1, $3, $2]);
}
| UPPERCASE  LOWERCASE  UPPERCASE  mactions  mexit
{
  if(!states.includes($1)) {
    states.push($1);
  }
  if(!states.includes($3)) {
    states.push($3);
  }
  edges.push([$1, $3, $2]);
}
| UPPERCASE  LOWERCASE  UPPERCASE  mentry mactions
{
  if(!states.includes($1)) {
    states.push($1);
  }
  if(!states.includes($3)) {
    states.push($3);
  }
  edges.push([$1, $3, $2]);
}
| UPPERCASE  LOWERCASE  UPPERCASE  mentry mactions mexit
{
  if(!states.includes($1)) {
    states.push($1);
  }
  if(!states.includes($3)) {
    states.push($3);
  }
  edges.push([$1, $3, $2]);
}
| UPPERCASE FINAL
{
  if(!states.includes($1)) {
    states.push($1);
  }
    states.push("FINAL");
    edges.push([$1, "FINAL", ""]);
}
| INVOKE  ID  LOWERCASE SRC LOWERCASE ONDONE LOWERCASE ONERROR LOWERCASE 
{
}
| INVOKE  ID  LOWERCASE SRC LOWERCASE ONDONE LOWERCASE mactions ONERROR LOWERCASE 
{
}
| INVOKE  ID  LOWERCASE SRC LOWERCASE ONDONE LOWERCASE ONERROR LOWERCASE   mactions
{
}
| INVOKE  ID  LOWERCASE SRC LOWERCASE ONDONE  LOWERCASE mactions ONERROR LOWERCASE  mactions
{
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
: ':' actions
{
  $$=[$2].reduce((acc,val) => acc.concat(val),[]);
}
| mactions actions
{
  $$=[$1,$2].reduce((acc,val) => acc.concat(val),[]);
}
;

invokes
: LOWERCASE        {$$=$1}
| '@' LOWERCASE    {$$=$2}
;

minvokes
: '@' invokes
{

}
| minvokes invokes  {

}
;

entry
: LOWERCASE          {$$=$1}
| ENTRY LOWERCASE    {$$=$2}
;

mentry
: ENTRY entry
{
 
}
| mentry entry  {

}
;

exit
: LOWERCASE          {$$=$1}
| EXIT LOWERCASE    {$$=$2}
;

mexit
: EXIT exit
{

}
| mexit exit  {

}
;
expressions
: context mstates
{
return [states, edges]; 
}
;
