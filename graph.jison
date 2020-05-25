		/* description:  */

%{
let x = '';
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
[a-z]+                    return 'LOWERCASE'
[A-Z]+                    return 'UPPERCASE'
[0-9]+                    return 'NUMBER'
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
 x =  x +
     'initial => ' +
		  $2 + ';' + '\n' +
			$2 + ' => ' + $4  + ': ' +
			$3 + ';' ;
}
| INITIAL    UPPERCASE   LOWERCASE  mactions
{
 x =  x +
     'initial => ' +
		  $2 + ';' + '\n' +
			$2 + ' => ' + $4  + ': ' +
			$3 + ';' ;
}
| INITIAL    UPPERCASE   LOWERCASE  UPPERCASE mentry 
{
 x =  x +
     'initial => ' +
		  $2 + ';' + '\n' +
			$2 + ' => ' + $4  + ': ' +
			$3 + ';' ;
}
| INITIAL    UPPERCASE   LOWERCASE  UPPERCASE mexit 
{
 x =  x +
     'initial => ' +
		  $2 + ';' + '\n' +
			$2 + ' => ' + $4  + ': ' +
			$3 + ';' ;
}
| INITIAL    UPPERCASE   LOWERCASE  UPPERCASE mentry  mexit
{
 x =  x +
     'initial => ' +
		  $2 + ';' + '\n' +
			$2 + ' => ' + $4  + ': ' +
			$3 + ';' ;
}
| UPPERCASE   LOWERCASE  UPPERCASE
{
  x = x + '\n' + $1 + ' => ' + $3 + ': ' + $2 + ';' ;
}
| UPPERCASE   LOWERCASE  UPPERCASE mentry
{
  x = x + '\n' + $1 + ' => ' + $3 + ': ' + $2 + ';' ;
}
| UPPERCASE   LOWERCASE  UPPERCASE mentry mexit
{
  x = x + '\n' + $1 + ' => ' + $3 + ': ' + $2 + ';' ;
}
| UPPERCASE   LOWERCASE  UPPERCASE mexit
{
  x = x + '\n' + $1 + ' => ' + $3 + ': ' + $2 + ';' ;
}
| INITIAL UPPERCASE  mentry minvokes 
{
 x =  x +
     'initial => ' +
		  $2 + ';' 

}
}
| INITIAL UPPERCASE  mentry minvokes mexit
{
 x =  x +
     'initial => ' +
		  $2 + ';' 
}
| INITIAL UPPERCASE   minvokes
{
 x =  x +
     'initial => ' +
		  $2 + ';' 
}
| INITIAL UPPERCASE   minvokes mexit
{
 x =  x +
     'initial => ' +
		  $2 + ';' 
}
| INITIAL UPPERCASE  LOWERCASE  UPPERCASE  minvokes mexit
{
 x =  x +
     'initial => ' +
		  $2 + ';' + '\n' +
			$2 + ' => ' + $4  + ': ' +
			$3 + ';' ;

}
| INITIAL UPPERCASE  LOWERCASE  UPPERCASE  mentry minvokes
{
 x =  x +
     'initial => ' +
		  $2 + ';' + '\n' +
			$2 + ' => ' + $4  + ': ' +
			$3 + ';' ;

}
| INITIAL UPPERCASE  LOWERCASE  UPPERCASE  mentry minvokes mexit
{
 x =  x +
     'initial => ' +
		  $2 + ';' + '\n' +
			$2 + ' => ' + $4  + ': ' +
			$3 + ';' ;

}
| INITIAL UPPERCASE     LOWERCASE  UPPERCASE  mactions
{
 x =  x +
     'initial => ' +
		  $2 + ';' + '\n' +
			$2 + ' => ' + $4  + ': ' +
			$3 + ';' ;

}
| INITIAL UPPERCASE     LOWERCASE  UPPERCASE  mactions mexit
{
 x =  x +
     'initial => ' +
		  $2 + ';' + '\n' +
			$2 + ' => ' + $4  + ': ' +
			$3 + ';' ;

}
| INITIAL UPPERCASE  LOWERCASE  UPPERCASE  mentry mactions
{
 x =  x +
     'initial => ' +
		  $2 + ';' + '\n' +
			$2 + ' => ' + $4  + ': ' +
			$3 + ';' ;

}
| INITIAL UPPERCASE  LOWERCASE  UPPERCASE  mentry mactions mexit
{
 x =  x +
     'initial => ' +
		  $2 + ';' + '\n' +
			$2 + ' => ' + $4  + ': ' +
			$3 + ';' ;
}

| UPPERCASE  LOWERCASE  mactions
{
 x = x + '\n' + $1 + ': ' + $2 + ';' ;
}

| UPPERCASE  LOWERCASE  UPPERCASE  mactions
{
  x = x + '\n' + $1 + ' => ' + $3 + ': ' + $2 + ';' ;

}
| UPPERCASE  LOWERCASE  UPPERCASE  mactions  mexit
{
  x = x + '\n' + $1 + ' => ' + $3 + ': ' + $2 + ';' ;
}
| UPPERCASE  LOWERCASE  UPPERCASE  mentry mactions
{
  x = x + '\n' + $1 + ' => ' + $3 + ': ' + $2 + ';' ;
}
| UPPERCASE  LOWERCASE  UPPERCASE  mentry mactions mexit
{
 x = x + '\n' + $1 + ' => ' + $3 + ': ' + $2 + ';' ;
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
return x; 
}
;
