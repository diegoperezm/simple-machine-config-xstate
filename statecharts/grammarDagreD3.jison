		/* description:  */

%{
let invokes = [];
let states  = [];
let edges   = [];
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
[a-z0-9]+                 return 'LOWERCASE'
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

mnumber
: NUMBER  NUMBER        {$$=[+$1,+$2]}
| mnumber NUMBER        {$$=[...$1,+$2]}
;

data
: '[' ']'              {$$=[[]]}
| '"' '"'              {$$=[""]}
| '"' LOWERCASE '"'    {$$=[$2]}
| NUMBER               {$$=[+$1]}
| '[' NUMBER ']'       {$$=[[+$2]]}
| '[' mnumber ']'      {$$=[[$2]]}
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
| UPPERCASE  
{
  if(!states.includes($1)) {
    states.push($1);
  }
  
}
| UPPERCASE minvokes 
{
  if(!states.includes($1)) {
    states.push($1);
  }
 let invokeIndex = invokes.map(ele => ele.id).indexOf(...$2);
 edges.push([$1,invokes[invokeIndex].onDone,'onDone'],
            [$1,invokes[invokeIndex].onError,'onError'],
 );
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
| INVOKE  ID  LOWERCASE SRC LOWERCASE ONDONE UPPERCASE ONERROR UPPERCASE 
{
    let  objInvoke      = {};
    objInvoke.id        = $3; 
    objInvoke.onDone    = $7; 
    objInvoke.onError   = $9; 
    invokes.push(objInvoke);

}
| INVOKE  ID  LOWERCASE SRC LOWERCASE ONDONE UPPERCASE mactions ONERROR UPPERCASE 
{
  let objInvokeOnDoneAct             = {}; 
  objInvokeOnDoneAct.id              = $3;
  objInvokeOnDoneAct.onDone          = $7;
  objInvokeOnDoneAct.onError         = $10;
  invokes.push(objInvokeOnDoneAct);
}
| INVOKE  ID  LOWERCASE SRC LOWERCASE ONDONE UPPERCASE ONERROR UPPERCASE   mactions
{
  let objInvokeOnErrorAct              = {}; 
  objInvokeOnErrorAct.id               = $3;
  objInvokeOnErrorAct.onDone           = $7;   
  objInvokeOnErrorAct.onError          = $9; 
  invokes.push(objInvokeOnErrorAct);

 }
| INVOKE  ID  LOWERCASE SRC LOWERCASE ONDONE  UPPERCASE mactions ONERROR UPPERCASE  mactions
{
  let objInvokeOnDoneErrorAct             = {}; 
  objInvokeOnDoneErrorAct.id              = $3;
  objInvokeOnDoneErrorAct.onDone          = $7;
  objInvokeOnDoneErrorAct.onError         = $10;
  invokes.push(objInvokeOnDoneErrorAct);
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
  $$=[$2];
}
| minvokes invokes  {
  $$=[$1,$2];
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
