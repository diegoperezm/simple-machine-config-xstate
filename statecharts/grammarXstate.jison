		/* description:  */

%{
let invokes        =[];
let z              ={};
z.initial          ="";
z.context          ={};
z.states           ={};
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
| context   mdata {z.context[$2[0]] = $2[1]}
;

states
: INITIAL    UPPERCASE   LOWERCASE  UPPERCASE
{
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
| INITIAL    UPPERCASE   LOWERCASE  mactions
{
   z.initial = $2
   if(z.states[$2] != undefined) {
    z.states[$2].on[$3] = {};
    z.states[$2].on[$3].actions = $4;
   }else {
    z.states[$2] = {};
    z.states[$2].on = {};
    z.states[$2].on[$3] = {};
    z.states[$2].on[$3].actions = $4;
  }
}
| INITIAL    UPPERCASE   LOWERCASE  UPPERCASE mentry 
{
   z.initial = $2
   if(z.states[$2] != undefined) {
    z.states[$2].entry = $5;
    z.states[$2].on[$3] = {};
    z.states[$2].on[$3].target = $4;
   }else {
    z.states[$2] = {};
    z.states[$2].entry = $5;
    z.states[$2].on = {};
    z.states[$2].on[$3] = {};
    z.states[$2].on[$3].target = $4;
  }

}
| INITIAL    UPPERCASE   LOWERCASE  UPPERCASE mexit 
{
   z.initial = $2
   if(z.states[$2] != undefined) {
    z.states[$2].exit = $5;
    z.states[$2].on[$3] = {};
    z.states[$2].on[$3].target = $4;
   }else {
    z.states[$2] = {};
    z.states[$2].exit = $5;
    z.states[$2].on = {};
    z.states[$2].on[$3] = {};
    z.states[$2].on[$3].target = $4;
  }

}
| INITIAL    UPPERCASE   LOWERCASE  UPPERCASE mentry  mexit
{
   z.initial = $2
   if(z.states[$2] != undefined) {
    z.states[$2].entry = $5;
    z.states[$2].exit = $6;
    z.states[$2].on[$3] = {};
    z.states[$2].on[$3].target = $4;
   }else {
    z.states[$2] = {};
    z.states[$2].entry = $5;
    z.states[$2].exit = $6;
    z.states[$2].on = {};
    z.states[$2].on[$3] = {};
    z.states[$2].on[$3].target = $4;
  }
}
| UPPERCASE 
{
  z.states[$1]    = {};
}
| UPPERCASE minvokes  
{
  let invokeIndex = invokes.map(ele => ele.id).indexOf(...$2);
  z.states[$1]    = {};
  z.states[$1].invoke = invokes[invokeIndex]; 
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
| UPPERCASE   LOWERCASE  UPPERCASE mentry
{
  if(z.states[$1] != undefined) {
    z.states[$1].entry = $4;
    z.states[$1].on[$2] = {};
    z.states[$1].on[$2].target = $3;
  }else {
    z.states[$1] = {};
    z.states[$1].entry = $4;
    z.states[$1].on = {};
    z.states[$1].on[$2] = {};
    z.states[$1].on[$2].target = $3;
  }
}
| UPPERCASE   LOWERCASE  UPPERCASE mentry mexit
{
  if(z.states[$1] != undefined) {
    z.states[$1].entry = $4;
    z.states[$1].exit  = $5;
    z.states[$1].on[$2] = {};
    z.states[$1].on[$2].target = $3;
  }else {
    z.states[$1] = {};
    z.states[$1].entry = $4;
    z.states[$1].exit  = $5;
    z.states[$1].on = {};
    z.states[$1].on[$2] = {};
    z.states[$1].on[$2].target = $3;
  }
}
| UPPERCASE   LOWERCASE  UPPERCASE mexit
{
  if(z.states[$1] != undefined) {
    z.states[$1].exit = $4;
    z.states[$1].on[$2] = {};
    z.states[$1].on[$2].target = $3;
  }else {
    z.states[$1] = {};
    z.states[$1].exit = $4;
    z.states[$1].on = {};
    z.states[$1].on[$2] = {};
    z.states[$1].on[$2].target = $3;
  }
}
| INITIAL UPPERCASE  mentry minvokes 
{
  z.initial = $2; 
  if(z.states[$2] != undefined) {
  }else {
   let invokeIndex = invokes.map(ele => ele.id).indexOf(...$4); 
   z.states[$2] = {};
   z.states[$2].entry = $3;
   z.states[$2].invoke = invokes[invokeIndex]; 
  }
}
| INITIAL UPPERCASE mentry minvokes mexit
{
  z.initial = $2; 
  if(z.states[$2] != undefined) {
  }else {
   let invokeIndex = invokes.map(ele => ele.id).indexOf(...$4); 
   z.states[$2] = {};
   z.states[$2].entry = $3;
   z.states[$2].exit = $5;
   z.states[$2].invoke = invokes[invokeIndex]; 
  }
}
| INITIAL UPPERCASE   minvokes
{
  z.initial = $2; 
  if(z.states[$2] != undefined) {
  }else {
   let invokeIndex = invokes.map(ele => ele.id).indexOf(...$3); 
   z.states[$2] = {};
   z.states[$2].invoke = invokes[invokeIndex]; 
  }
}
| INITIAL UPPERCASE   minvokes mexit
{
  z.initial = $2; 
  if(z.states[$2] != undefined) {
  }else {
   let invokeIndex = invokes.map(ele => ele.id).indexOf(...$3); 
   z.states[$2] = {};
   z.states[$2].exit = $4;
   z.states[$2].invoke = invokes[invokeIndex]; 
  }
}
| INITIAL UPPERCASE  LOWERCASE  UPPERCASE  minvokes mexit
{
  z.initial = $2; 
  if(z.states[$2] != undefined) {
   z.states[$2].exit = $6;
   z.states[$2].on[$3] = {};
   z.states[$2].on[$3].target = $4;
  }else {
   let invokeIndex = invokes.map( ele => ele.id).indexOf(...$5); 
   z.states[$2] = {};
   z.states[$2].exit = $6;
   z.states[$2].invoke = invokes[invokeIndex]; 
   z.states[$2].on = {};
   z.states[$2].on[$3] = {};
   z.states[$2].on[$3].target = $4;
  }
}
| INITIAL UPPERCASE  LOWERCASE  UPPERCASE  mentry minvokes
{
  z.initial = $2; 
  if(z.states[$2] != undefined) {
   z.states[$2].entry =  $5;
   z.states[$2].on[$3] = {};
   z.states[$2].on[$3].target = $4;
  }else {
   let invokeIndex = invokes.map( ele => ele.id).indexOf(...$6); 
   z.states[$2] = {};
   z.states[$2].entry =  $5;
   z.states[$2].invoke = invokes[invokeIndex]; 
   z.states[$2].on = {};
   z.states[$2].on[$3] = {};
   z.states[$2].on[$3].target = $4;
  }
}
| INITIAL UPPERCASE  LOWERCASE  UPPERCASE  mentry minvokes mexit
{
  z.initial = $2; 
  if(z.states[$2] != undefined) {
   z.states[$2].entry  =  $5;
   z.states[$2].exit   =  $7;
   z.states[$2].on[$3] = {};
   z.states[$2].on[$3].target = $4;
  }else {
   let invokeIndex = invokes.map( ele => ele.id).indexOf(...$6); 
   z.states[$2] = {};
   z.states[$2].entry =  $5;
   z.states[$2].exit  =  $7;
   z.states[$2].invoke = invokes[invokeIndex]; 
   z.states[$2].on = {};
   z.states[$2].on[$3] = {};
   z.states[$2].on[$3].target = $4;
  }
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
| INITIAL UPPERCASE     LOWERCASE  UPPERCASE  mactions mexit
{
  z.initial = $2; 
  if(z.states[$2] != undefined) {
   z.states[$2].exit = $6;
   z.states[$2].on[$3] = {};
   z.states[$2].on[$3].target = $4;
   z.states[$2].on[$3].actions = $5;
  }else {
   z.states[$2] = {};
   z.states[$2].exit = $6;
   z.states[$2].on = {};
   z.states[$2].on[$3] = {};
   z.states[$2].on[$3].target = $4;
   z.states[$2].on[$3].actions = $5;
  }
}
| INITIAL UPPERCASE  LOWERCASE  UPPERCASE  mentry mactions
{
  z.initial = $2; 
  if(z.states[$2] != undefined) {
   z.states[$2].entry = $5;
   z.states[$2].on[$3] = {};
   z.states[$2].on[$3].target = $4;
   z.states[$2].on[$3].actions = $6;
  }else {
   z.states[$2] = {};
   z.states[$2].entry = $5;
   z.states[$2].on = {};
   z.states[$2].on[$3] = {};
   z.states[$2].on[$3].target = $4;
   z.states[$2].on[$3].actions = $6;
  }
}
| INITIAL UPPERCASE  LOWERCASE  UPPERCASE  mentry mactions mexit
{
  z.initial = $2; 
  if(z.states[$2] != undefined) {
   z.states[$2].entry = $5;
   z.states[$2].exit = $7;
   z.states[$2].on[$3] = {};
   z.states[$2].on[$3].target = $4;
   z.states[$2].on[$3].actions = $6;
  }else {
   z.states[$2] = {};
   z.states[$2].entry = $5;
   z.states[$2].exit = $7;
   z.states[$2].on = {};
   z.states[$2].on[$3] = {};
   z.states[$2].on[$3].target = $4;
   z.states[$2].on[$3].actions = $6;
  }
}

| UPPERCASE  LOWERCASE  mactions
{
  if(z.states[$1] != undefined) {
   z.states[$1].on[$2] = {};
   z.states[$1].on[$2].actions = $3;
  }else {
   z.states[$1] = {};
   z.states[$1].on = {};
   z.states[$1].on[$2] = {};
   z.states[$1].on[$2].actions = $3;
  }
}


| UPPERCASE  LOWERCASE  UPPERCASE  mactions
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
| UPPERCASE  LOWERCASE  UPPERCASE  mactions  mexit
{
  if(z.states[$1] != undefined) {
   z.states[$1].on[$2] = {};
   z.states[$1].exit  = $5; 
   z.states[$1].on[$2].target = $3;
   z.states[$1].on[$2].actions = $4;
  }else {
   z.states[$1] = {};
   z.states[$1].exit  = $5; 
   z.states[$1].on = {};
   z.states[$1].on[$2] = {};
   z.states[$1].on[$2].target = $3;
   z.states[$1].on[$2].actions = $4;
  }
}
| UPPERCASE  LOWERCASE  UPPERCASE  mentry mactions
{
  if(z.states[$1] != undefined) {
   z.states[$1].entry = $4;
   z.states[$1].on[$2] = {};
   z.states[$1].on[$2].target = $3;
   z.states[$1].on[$2].actions = $5;
  }else {
   z.states[$1] = {};
   z.states[$1].entry = $4;
   z.states[$1].on = {};
   z.states[$1].on[$2] = {};
   z.states[$1].on[$2].target = $3;
   z.states[$1].on[$2].actions = $5;
  }
}
| UPPERCASE  LOWERCASE  UPPERCASE  mentry mactions mexit
{
  if(z.states[$1] != undefined) {
   z.states[$1].entry = $4;
   z.states[$1].exit = $6;
   z.states[$1].on[$2] = {};
   z.states[$1].on[$2].target = $3;
   z.states[$1].on[$2].actions = $5;
  }else {
   z.states[$1] = {};
   z.states[$1].entry = $4;
   z.states[$1].exit = $6;
   z.states[$1].on = {};
   z.states[$1].on[$2] = {};
   z.states[$1].on[$2].target = $3;
   z.states[$1].on[$2].actions = $5;
  }
}
| UPPERCASE FINAL
{
   z.states[$1] = {};
   z.states[$1].type = "final";
}
| INVOKE  ID  LOWERCASE SRC LOWERCASE ONDONE UPPERCASE ONERROR UPPERCASE 
{
  let objInvoke             = {}; 
  objInvoke.id              = $3;
  objInvoke.src             = $5;
  objInvoke.onDone          = {};
  objInvoke.onDone.target   = $7;
  objInvoke.onError         = {};
  objInvoke.onError.target  = $9;
  invokes.push(objInvoke);
}
| INVOKE  ID  LOWERCASE SRC LOWERCASE ONDONE UPPERCASE mactions ONERROR UPPERCASE 
{
  let objInvokeOnDoneAct             = {}; 
  objInvokeOnDoneAct .id              = $3;
  objInvokeOnDoneAct .src             = $5;
  objInvokeOnDoneAct .onDone          = {};
  objInvokeOnDoneAct .onDone.target   = $7;
  objInvokeOnDoneAct .onDone.actions  = [];
  objInvokeOnDoneAct .onDone.actions.push(...$8);
  objInvokeOnDoneAct .onError         = {};
  objInvokeOnDoneAct .onError.target  = $10;
  invokes.push(objInvokeOnDoneAct);
}
| INVOKE  ID  LOWERCASE SRC LOWERCASE ONDONE UPPERCASE ONERROR UPPERCASE   mactions
{
  let objInvokeOnErrorAct              = {}; 
  objInvokeOnErrorAct.id               = $3;
  objInvokeOnErrorAct.src              = $5;
  objInvokeOnErrorAct.onDone           = {};
  objInvokeOnErrorAct.onDone.target    = $7;
  objInvokeOnErrorAct.onError          = {};
  objInvokeOnErrorAct.onError.target   = $9;
  objInvokeOnErrorAct.onError.actions  = [];
  objInvokeOnErrorAct.onError.actions.push(...$10);
  invokes.push(objInvokeOnErrorAct);
}
| INVOKE  ID  LOWERCASE SRC LOWERCASE ONDONE  UPPERCASE mactions ONERROR UPPERCASE  mactions
{
  let objInvokeOnDoneErrorAct              = {}; 
  objInvokeOnDoneErrorAct .id              = $3;
  objInvokeOnDoneErrorAct .src             = $5;
  objInvokeOnDoneErrorAct .onDone          = {};
  objInvokeOnDoneErrorAct .onDone.target   = $7;
  objInvokeOnDoneErrorAct .onDone.actions  = [];
  objInvokeOnDoneErrorAct .onDone.actions.push(...$8);
  objInvokeOnDoneErrorAct .onError         = {};
  objInvokeOnDoneErrorAct .onError.target  = $10;
  objInvokeOnDoneErrorAct .onError.actions = [];
  objInvokeOnDoneErrorAct .onError.actions.push(...$11);
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
  $$=[$2].reduce((acc,val) => acc.concat(val),[]);
}
| minvokes invokes  {
  $$=[$1,$2].reduce((acc,val) => acc.concat(val),[]);
}
;

entry
: LOWERCASE          {$$=$1}
| ENTRY LOWERCASE    {$$=$2}
;

mentry
: ENTRY entry
{
  $$=[$2].reduce((acc,val) => acc.concat(val),[]);
}
| mentry entry  {
  $$=[$1,$2].reduce((acc,val) => acc.concat(val),[]);
}
;

exit
: LOWERCASE          {$$=$1}
| EXIT LOWERCASE    {$$=$2}
;

mexit
: EXIT exit
{
  $$=[$2].reduce((acc,val) => acc.concat(val),[]);
}
| mexit exit  {
  $$=[$1,$2].reduce((acc,val) => acc.concat(val),[]);
}
;


expressions
: context mstates
{
return z;
}
;
