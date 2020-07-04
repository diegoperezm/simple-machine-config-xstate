/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var grammarXstate = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[7,14,15,21],$V1=[1,8],$V2=[1,9],$V3=[1,10],$V4=[1,14,15,21],$V5=[1,26],$V6=[1,25],$V7=[1,29],$V8=[1,38],$V9=[1,39],$Va=[1,43],$Vb=[1,44],$Vc=[1,42],$Vd=[1,51],$Ve=[1,52],$Vf=[1,7,10,14,15,21,29,31,33],$Vg=[1,63],$Vh=[1,64],$Vi=[1,7,14,15,21,29,33],$Vj=[1,7,10,14,15,21,25,33],$Vk=[1,7,14,15,21,33];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"data":3,"[":4,"]":5,"\"":6,"LOWERCASE":7,"NUMBER":8,"mdata":9,":":10,"context":11,"CONTEXT":12,"states":13,"INITIAL":14,"UPPERCASE":15,"mactions":16,"mentry":17,"mexit":18,"minvokes":19,"FINAL":20,"INVOKE":21,"ID":22,"SRC":23,"ONDONE":24,"ONERROR":25,"mstates":26,"actions":27,"invokes":28,"@":29,"entry":30,"ENTRY":31,"exit":32,"EXIT":33,"expressions":34,"$accept":0,"$end":1},
terminals_: {2:"error",4:"[",5:"]",6:"\"",7:"LOWERCASE",8:"NUMBER",10:":",12:"CONTEXT",14:"INITIAL",15:"UPPERCASE",20:"FINAL",21:"INVOKE",22:"ID",23:"SRC",24:"ONDONE",25:"ONERROR",29:"@",31:"ENTRY",33:"EXIT"},
productions_: [0,[3,2],[3,2],[3,3],[3,1],[9,3],[11,0],[11,2],[11,2],[13,4],[13,4],[13,5],[13,5],[13,6],[13,3],[13,4],[13,5],[13,4],[13,4],[13,5],[13,3],[13,4],[13,6],[13,6],[13,7],[13,5],[13,6],[13,6],[13,7],[13,3],[13,4],[13,5],[13,5],[13,6],[13,2],[13,9],[13,10],[13,10],[13,11],[26,1],[26,2],[27,1],[27,2],[16,2],[16,2],[28,1],[28,2],[19,2],[19,2],[30,1],[30,2],[17,2],[17,2],[32,1],[32,2],[18,2],[18,2],[34,2]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
this.$=[[]]
break;
case 2:
this.$=[""]
break;
case 3:
this.$=[$$[$0-1]]
break;
case 4:
this.$=[+$$[$0]]
break;
case 5:
this.$=[$$[$0-2],...$$[$0]]
break;
case 8:
z.context[$$[$0][0]] = $$[$0][1]
break;
case 9:

   z.initial = $$[$0-2]
   if(z.states[$$[$0-2]] != undefined) {
    z.states[$$[$0-2]].on[$$[$0-1]] = {};
    z.states[$$[$0-2]].on[$$[$0-1]].target = $$[$0];
   }else {
    z.states[$$[$0-2]] = {};
    z.states[$$[$0-2]].on = {};
    z.states[$$[$0-2]].on[$$[$0-1]] = {};
    z.states[$$[$0-2]].on[$$[$0-1]].target = $$[$0];
  }

break;
case 10:

   z.initial = $$[$0-2]
   if(z.states[$$[$0-2]] != undefined) {
    z.states[$$[$0-2]].on[$$[$0-1]] = {};
    z.states[$$[$0-2]].on[$$[$0-1]].actions = $$[$0];
   }else {
    z.states[$$[$0-2]] = {};
    z.states[$$[$0-2]].on = {};
    z.states[$$[$0-2]].on[$$[$0-1]] = {};
    z.states[$$[$0-2]].on[$$[$0-1]].actions = $$[$0];
  }

break;
case 11:

   z.initial = $$[$0-3]
   if(z.states[$$[$0-3]] != undefined) {
    z.states[$$[$0-3]].entry = $$[$0];
    z.states[$$[$0-3]].on[$$[$0-2]] = {};
    z.states[$$[$0-3]].on[$$[$0-2]].target = $$[$0-1];
   }else {
    z.states[$$[$0-3]] = {};
    z.states[$$[$0-3]].entry = $$[$0];
    z.states[$$[$0-3]].on = {};
    z.states[$$[$0-3]].on[$$[$0-2]] = {};
    z.states[$$[$0-3]].on[$$[$0-2]].target = $$[$0-1];
  }


break;
case 12:

   z.initial = $$[$0-3]
   if(z.states[$$[$0-3]] != undefined) {
    z.states[$$[$0-3]].exit = $$[$0];
    z.states[$$[$0-3]].on[$$[$0-2]] = {};
    z.states[$$[$0-3]].on[$$[$0-2]].target = $$[$0-1];
   }else {
    z.states[$$[$0-3]] = {};
    z.states[$$[$0-3]].exit = $$[$0];
    z.states[$$[$0-3]].on = {};
    z.states[$$[$0-3]].on[$$[$0-2]] = {};
    z.states[$$[$0-3]].on[$$[$0-2]].target = $$[$0-1];
  }


break;
case 13:

   z.initial = $$[$0-4]
   if(z.states[$$[$0-4]] != undefined) {
    z.states[$$[$0-4]].entry = $$[$0-1];
    z.states[$$[$0-4]].exit = $$[$0];
    z.states[$$[$0-4]].on[$$[$0-3]] = {};
    z.states[$$[$0-4]].on[$$[$0-3]].target = $$[$0-2];
   }else {
    z.states[$$[$0-4]] = {};
    z.states[$$[$0-4]].entry = $$[$0-1];
    z.states[$$[$0-4]].exit = $$[$0];
    z.states[$$[$0-4]].on = {};
    z.states[$$[$0-4]].on[$$[$0-3]] = {};
    z.states[$$[$0-4]].on[$$[$0-3]].target = $$[$0-2];
  }


break;
case 14:

  if(z.states[$$[$0-2]] != undefined) {
    z.states[$$[$0-2]].on[$$[$0-1]] = {};
    z.states[$$[$0-2]].on[$$[$0-1]].target = $$[$0];
  }else {
    z.states[$$[$0-2]] = {};
    z.states[$$[$0-2]].on = {};
    z.states[$$[$0-2]].on[$$[$0-1]] = {};
    z.states[$$[$0-2]].on[$$[$0-1]].target = $$[$0];
  }

break;
case 15:

  if(z.states[$$[$0-3]] != undefined) {
    z.states[$$[$0-3]].entry = $$[$0];
    z.states[$$[$0-3]].on[$$[$0-2]] = {};
    z.states[$$[$0-3]].on[$$[$0-2]].target = $$[$0-1];
  }else {
    z.states[$$[$0-3]] = {};
    z.states[$$[$0-3]].entry = $$[$0];
    z.states[$$[$0-3]].on = {};
    z.states[$$[$0-3]].on[$$[$0-2]] = {};
    z.states[$$[$0-3]].on[$$[$0-2]].target = $$[$0-1];
  }

break;
case 16:

  if(z.states[$$[$0-4]] != undefined) {
    z.states[$$[$0-4]].entry = $$[$0-1];
    z.states[$$[$0-4]].exit  = $$[$0];
    z.states[$$[$0-4]].on[$$[$0-3]] = {};
    z.states[$$[$0-4]].on[$$[$0-3]].target = $$[$0-2];
  }else {
    z.states[$$[$0-4]] = {};
    z.states[$$[$0-4]].entry = $$[$0-1];
    z.states[$$[$0-4]].exit  = $$[$0];
    z.states[$$[$0-4]].on = {};
    z.states[$$[$0-4]].on[$$[$0-3]] = {};
    z.states[$$[$0-4]].on[$$[$0-3]].target = $$[$0-2];
  }

break;
case 17:

  if(z.states[$$[$0-3]] != undefined) {
    z.states[$$[$0-3]].exit = $$[$0];
    z.states[$$[$0-3]].on[$$[$0-2]] = {};
    z.states[$$[$0-3]].on[$$[$0-2]].target = $$[$0-1];
  }else {
    z.states[$$[$0-3]] = {};
    z.states[$$[$0-3]].exit = $$[$0];
    z.states[$$[$0-3]].on = {};
    z.states[$$[$0-3]].on[$$[$0-2]] = {};
    z.states[$$[$0-3]].on[$$[$0-2]].target = $$[$0-1];
  }

break;
case 18:

  z.initial = $$[$0-2]; 
  if(z.states[$$[$0-2]] != undefined) {
  }else {
   let invokeIndex = invokes.map(ele => ele.id).indexOf(...$$[$0]); 
   z.states[$$[$0-2]] = {};
   z.states[$$[$0-2]].entry = $$[$0-1];
   z.states[$$[$0-2]].invoke = invokes[invokeIndex]; 
  }

break;
case 19:

  z.initial = $$[$0-3]; 
  if(z.states[$$[$0-3]] != undefined) {
  }else {
   let invokeIndex = invokes.map(ele => ele.id).indexOf(...$$[$0-1]); 
   z.states[$$[$0-3]] = {};
   z.states[$$[$0-3]].entry = $$[$0-2];
   z.states[$$[$0-3]].exit = $$[$0];
   z.states[$$[$0-3]].invoke = invokes[invokeIndex]; 
  }

break;
case 20:

  z.initial = $$[$0-1]; 
  if(z.states[$$[$0-1]] != undefined) {
  }else {
   let invokeIndex = invokes.map(ele => ele.id).indexOf(...$$[$0]); 
   z.states[$$[$0-1]] = {};
   z.states[$$[$0-1]].invoke = invokes[invokeIndex]; 
  }

break;
case 21:

  z.initial = $$[$0-2]; 
  if(z.states[$$[$0-2]] != undefined) {
  }else {
   let invokeIndex = invokes.map(ele => ele.id).indexOf(...$$[$0-1]); 
   z.states[$$[$0-2]] = {};
   z.states[$$[$0-2]].exit = $$[$0];
   z.states[$$[$0-2]].invoke = invokes[invokeIndex]; 
  }

break;
case 22:

  z.initial = $$[$0-4]; 
  if(z.states[$$[$0-4]] != undefined) {
   z.states[$$[$0-4]].exit = $$[$0];
   z.states[$$[$0-4]].on[$$[$0-3]] = {};
   z.states[$$[$0-4]].on[$$[$0-3]].target = $$[$0-2];
  }else {
   let invokeIndex = invokes.map( ele => ele.id).indexOf(...$$[$0-1]); 
   z.states[$$[$0-4]] = {};
   z.states[$$[$0-4]].exit = $$[$0];
   z.states[$$[$0-4]].invoke = invokes[invokeIndex]; 
   z.states[$$[$0-4]].on = {};
   z.states[$$[$0-4]].on[$$[$0-3]] = {};
   z.states[$$[$0-4]].on[$$[$0-3]].target = $$[$0-2];
  }

break;
case 23:

  z.initial = $$[$0-4]; 
  if(z.states[$$[$0-4]] != undefined) {
   z.states[$$[$0-4]].entry =  $$[$0-1];
   z.states[$$[$0-4]].on[$$[$0-3]] = {};
   z.states[$$[$0-4]].on[$$[$0-3]].target = $$[$0-2];
  }else {
   let invokeIndex = invokes.map( ele => ele.id).indexOf(...$$[$0]); 
   z.states[$$[$0-4]] = {};
   z.states[$$[$0-4]].entry =  $$[$0-1];
   z.states[$$[$0-4]].invoke = invokes[invokeIndex]; 
   z.states[$$[$0-4]].on = {};
   z.states[$$[$0-4]].on[$$[$0-3]] = {};
   z.states[$$[$0-4]].on[$$[$0-3]].target = $$[$0-2];
  }

break;
case 24:

  z.initial = $$[$0-5]; 
  if(z.states[$$[$0-5]] != undefined) {
   z.states[$$[$0-5]].entry  =  $$[$0-2];
   z.states[$$[$0-5]].exit   =  $$[$0];
   z.states[$$[$0-5]].on[$$[$0-4]] = {};
   z.states[$$[$0-5]].on[$$[$0-4]].target = $$[$0-3];
  }else {
   let invokeIndex = invokes.map( ele => ele.id).indexOf(...$$[$0-1]); 
   z.states[$$[$0-5]] = {};
   z.states[$$[$0-5]].entry =  $$[$0-2];
   z.states[$$[$0-5]].exit  =  $$[$0];
   z.states[$$[$0-5]].invoke = invokes[invokeIndex]; 
   z.states[$$[$0-5]].on = {};
   z.states[$$[$0-5]].on[$$[$0-4]] = {};
   z.states[$$[$0-5]].on[$$[$0-4]].target = $$[$0-3];
  }

break;
case 25:

  z.initial = $$[$0-3]; 
  if(z.states[$$[$0-3]] != undefined) {
   z.states[$$[$0-3]].on[$$[$0-2]] = {};
   z.states[$$[$0-3]].on[$$[$0-2]].target = $$[$0-1];
   z.states[$$[$0-3]].on[$$[$0-2]].actions = $$[$0];
  }else {
   z.states[$$[$0-3]] = {};
   z.states[$$[$0-3]].on = {};
   z.states[$$[$0-3]].on[$$[$0-2]] = {};
   z.states[$$[$0-3]].on[$$[$0-2]].target = $$[$0-1];
   z.states[$$[$0-3]].on[$$[$0-2]].actions = $$[$0];
  }

break;
case 26:

  z.initial = $$[$0-4]; 
  if(z.states[$$[$0-4]] != undefined) {
   z.states[$$[$0-4]].exit = $$[$0];
   z.states[$$[$0-4]].on[$$[$0-3]] = {};
   z.states[$$[$0-4]].on[$$[$0-3]].target = $$[$0-2];
   z.states[$$[$0-4]].on[$$[$0-3]].actions = $$[$0-1];
  }else {
   z.states[$$[$0-4]] = {};
   z.states[$$[$0-4]].exit = $$[$0];
   z.states[$$[$0-4]].on = {};
   z.states[$$[$0-4]].on[$$[$0-3]] = {};
   z.states[$$[$0-4]].on[$$[$0-3]].target = $$[$0-2];
   z.states[$$[$0-4]].on[$$[$0-3]].actions = $$[$0-1];
  }

break;
case 27:

  z.initial = $$[$0-4]; 
  if(z.states[$$[$0-4]] != undefined) {
   z.states[$$[$0-4]].entry = $$[$0-1];
   z.states[$$[$0-4]].on[$$[$0-3]] = {};
   z.states[$$[$0-4]].on[$$[$0-3]].target = $$[$0-2];
   z.states[$$[$0-4]].on[$$[$0-3]].actions = $$[$0];
  }else {
   z.states[$$[$0-4]] = {};
   z.states[$$[$0-4]].entry = $$[$0-1];
   z.states[$$[$0-4]].on = {};
   z.states[$$[$0-4]].on[$$[$0-3]] = {};
   z.states[$$[$0-4]].on[$$[$0-3]].target = $$[$0-2];
   z.states[$$[$0-4]].on[$$[$0-3]].actions = $$[$0];
  }

break;
case 28:

  z.initial = $$[$0-5]; 
  if(z.states[$$[$0-5]] != undefined) {
   z.states[$$[$0-5]].entry = $$[$0-2];
   z.states[$$[$0-5]].exit = $$[$0];
   z.states[$$[$0-5]].on[$$[$0-4]] = {};
   z.states[$$[$0-5]].on[$$[$0-4]].target = $$[$0-3];
   z.states[$$[$0-5]].on[$$[$0-4]].actions = $$[$0-1];
  }else {
   z.states[$$[$0-5]] = {};
   z.states[$$[$0-5]].entry = $$[$0-2];
   z.states[$$[$0-5]].exit = $$[$0];
   z.states[$$[$0-5]].on = {};
   z.states[$$[$0-5]].on[$$[$0-4]] = {};
   z.states[$$[$0-5]].on[$$[$0-4]].target = $$[$0-3];
   z.states[$$[$0-5]].on[$$[$0-4]].actions = $$[$0-1];
  }

break;
case 29:

  if(z.states[$$[$0-2]] != undefined) {
   z.states[$$[$0-2]].on[$$[$0-1]] = {};
   z.states[$$[$0-2]].on[$$[$0-1]].actions = $$[$0];
  }else {
   z.states[$$[$0-2]] = {};
   z.states[$$[$0-2]].on = {};
   z.states[$$[$0-2]].on[$$[$0-1]] = {};
   z.states[$$[$0-2]].on[$$[$0-1]].actions = $$[$0];
  }

break;
case 30:

  if(z.states[$$[$0-3]] != undefined) {
   z.states[$$[$0-3]].on[$$[$0-2]] = {};
   z.states[$$[$0-3]].on[$$[$0-2]].target = $$[$0-1];
   z.states[$$[$0-3]].on[$$[$0-2]].actions = $$[$0];
  }else {
   z.states[$$[$0-3]] = {};
   z.states[$$[$0-3]].on = {};
   z.states[$$[$0-3]].on[$$[$0-2]] = {};
   z.states[$$[$0-3]].on[$$[$0-2]].target = $$[$0-1];
   z.states[$$[$0-3]].on[$$[$0-2]].actions = $$[$0];
  }

break;
case 31:

  if(z.states[$$[$0-4]] != undefined) {
   z.states[$$[$0-4]].on[$$[$0-3]] = {};
   z.states[$$[$0-4]].exit  = $$[$0]; 
   z.states[$$[$0-4]].on[$$[$0-3]].target = $$[$0-2];
   z.states[$$[$0-4]].on[$$[$0-3]].actions = $$[$0-1];
  }else {
   z.states[$$[$0-4]] = {};
   z.states[$$[$0-4]].exit  = $$[$0]; 
   z.states[$$[$0-4]].on = {};
   z.states[$$[$0-4]].on[$$[$0-3]] = {};
   z.states[$$[$0-4]].on[$$[$0-3]].target = $$[$0-2];
   z.states[$$[$0-4]].on[$$[$0-3]].actions = $$[$0-1];
  }

break;
case 32:

  if(z.states[$$[$0-4]] != undefined) {
   z.states[$$[$0-4]].entry = $$[$0-1];
   z.states[$$[$0-4]].on[$$[$0-3]] = {};
   z.states[$$[$0-4]].on[$$[$0-3]].target = $$[$0-2];
   z.states[$$[$0-4]].on[$$[$0-3]].actions = $$[$0];
  }else {
   z.states[$$[$0-4]] = {};
   z.states[$$[$0-4]].entry = $$[$0-1];
   z.states[$$[$0-4]].on = {};
   z.states[$$[$0-4]].on[$$[$0-3]] = {};
   z.states[$$[$0-4]].on[$$[$0-3]].target = $$[$0-2];
   z.states[$$[$0-4]].on[$$[$0-3]].actions = $$[$0];
  }

break;
case 33:

  if(z.states[$$[$0-5]] != undefined) {
   z.states[$$[$0-5]].entry = $$[$0-2];
   z.states[$$[$0-5]].exit = $$[$0];
   z.states[$$[$0-5]].on[$$[$0-4]] = {};
   z.states[$$[$0-5]].on[$$[$0-4]].target = $$[$0-3];
   z.states[$$[$0-5]].on[$$[$0-4]].actions = $$[$0-1];
  }else {
   z.states[$$[$0-5]] = {};
   z.states[$$[$0-5]].entry = $$[$0-2];
   z.states[$$[$0-5]].exit = $$[$0];
   z.states[$$[$0-5]].on = {};
   z.states[$$[$0-5]].on[$$[$0-4]] = {};
   z.states[$$[$0-5]].on[$$[$0-4]].target = $$[$0-3];
   z.states[$$[$0-5]].on[$$[$0-4]].actions = $$[$0-1];
  }

break;
case 34:

   z.states[$$[$0-1]] = {};
   z.states[$$[$0-1]].type = "final";

break;
case 35:

  let objInvoke             = {}; 
  objInvoke.id              = $$[$0-6];
  objInvoke.src             = $$[$0-4];
  objInvoke.onDone          = {};
  objInvoke.onDone.target   = $$[$0-2];
  objInvoke.onError         = {};
  objInvoke.onError.target  = $$[$0];
  invokes.push(objInvoke);

break;
case 36:

  let objInvokeOnDoneAct             = {}; 
  objInvokeOnDoneAct .id              = $$[$0-7];
  objInvokeOnDoneAct .src             = $$[$0-5];
  objInvokeOnDoneAct .onDone          = {};
  objInvokeOnDoneAct .onDone.target   = $$[$0-3];
  objInvokeOnDoneAct .onDone.actions  = [];
  objInvokeOnDoneAct .onDone.actions.push(...$$[$0-2]);
  objInvokeOnDoneAct .onError         = {};
  objInvokeOnDoneAct .onError.target  = $$[$0];
  invokes.push(objInvokeOnDoneAct);

break;
case 37:

  let objInvokeOnErrorAct              = {}; 
  objInvokeOnErrorAct .id              = $$[$0-7];
  objInvokeOnErrorAct .src             = $$[$0-5];
  objInvokeOnErrorAct .onDone          = {};
  objInvokeOnErrorAct .onDone.target   = $$[$0-3];
  objInvokeOnErrorAct .onError         = {};
  objInvokeOnErrorAct .onError.target  = $$[$0-1];
  objInvokeOnErrorAct .onError.actions = [];
  objInvokeOnErrorAct .onError.actions.push(...$$[$0]);
  invokes.push(objInvokeOnErrorAct);

break;
case 38:

  let objInvokeOnDoneErrorAct              = {}; 
  objInvokeOnDoneErrorAct .id              = $$[$0-8];
  objInvokeOnDoneErrorAct .src             = $$[$0-6];
  objInvokeOnDoneErrorAct .onDone          = {};
  objInvokeOnDoneErrorAct .onDone.target   = $$[$0-4];
  objInvokeOnDoneErrorAct .onDone.actions  = [];
  objInvokeOnDoneErrorAct .onDone.actions.push(...$$[$0-3]);
  objInvokeOnDoneErrorAct .onError         = {};
  objInvokeOnDoneErrorAct .onError.target  = $$[$0-1];
  objInvokeOnDoneErrorAct .onError.actions = [];
  objInvokeOnDoneErrorAct .onError.actions.push(...$$[$0]);
  invokes.push(objInvokeOnDoneErrorAct);

break;
case 41: case 42: case 45: case 46: case 49: case 50: case 53: case 54:
this.$=$$[$0]
break;
case 43: case 47: case 51: case 55:

  this.$=[$$[$0]].reduce((acc,val) => acc.concat(val),[]);

break;
case 44: case 48: case 52: case 56:

  this.$=[$$[$0-1],$$[$0]].reduce((acc,val) => acc.concat(val),[]);

break;
case 57:

return z;

break;
}
},
table: [o($V0,[2,6],{34:1,11:2,12:[1,3]}),{1:[3]},{7:[1,7],9:5,13:6,14:$V1,15:$V2,21:$V3,26:4},{10:[1,11]},{1:[2,57],13:12,14:$V1,15:$V2,21:$V3},o($V0,[2,8]),o($V4,[2,39]),{10:[1,13]},{15:[1,14]},{7:[1,15],20:[1,16]},{22:[1,17]},o($V0,[2,7]),o($V4,[2,40]),{3:18,4:[1,19],6:[1,20],8:[1,21]},{7:[1,22],17:23,19:24,29:$V5,31:$V6},{10:$V7,15:[1,27],16:28},o($V4,[2,34]),{7:[1,30]},o($V0,[2,5]),{5:[1,31]},{6:[1,32],7:[1,33]},o($V0,[2,4]),{10:$V7,15:[1,34],16:35},{7:$V8,19:36,29:$V5,30:37,31:$V9},o($V4,[2,20],{18:40,28:41,7:$Va,29:$Vb,33:$Vc}),{7:$V8,30:45,31:$V9},{7:$Va,28:46,29:$Vb},o($V4,[2,14],{17:47,18:48,16:49,10:$V7,31:$V6,33:$Vc}),o($V4,[2,29],{27:50,7:$Vd,10:$Ve}),{7:$Vd,10:$Ve,27:53},{23:[1,54]},o($V0,[2,1]),o($V0,[2,2]),{6:[1,55]},o($V4,[2,9],{17:56,18:57,19:58,16:59,10:$V7,29:$V5,31:$V6,33:$Vc}),o($V4,[2,10],{27:50,7:$Vd,10:$Ve}),o($V4,[2,18],{28:41,18:60,7:$Va,29:$Vb,33:$Vc}),o($Vf,[2,52]),o($Vf,[2,49]),{7:[1,61]},o($V4,[2,21],{32:62,7:$Vg,33:$Vh}),o($Vi,[2,48]),{7:$Vg,32:65,33:$Vh},o($Vi,[2,45]),{7:[1,66]},o($Vf,[2,51]),o($Vi,[2,47]),o($V4,[2,15],{30:37,18:67,16:68,7:$V8,10:$V7,31:$V9,33:$Vc}),o($V4,[2,17],{32:62,7:$Vg,33:$Vh}),o($V4,[2,30],{27:50,18:69,7:$Vd,10:$Ve,33:$Vc}),o($Vj,[2,44]),o($Vj,[2,41]),{7:[1,70]},o($Vj,[2,43]),{7:[1,71]},o($V0,[2,3]),o($V4,[2,11],{30:37,18:72,19:73,16:74,7:$V8,10:$V7,29:$V5,31:$V9,33:$Vc}),o($V4,[2,12],{32:62,7:$Vg,33:$Vh}),{7:$Va,18:75,28:41,29:$Vb,33:$Vc},o($V4,[2,25],{27:50,18:76,7:$Vd,10:$Ve,33:$Vc}),o($V4,[2,19],{32:62,7:$Vg,33:$Vh}),o($Vf,[2,50]),o($Vk,[2,56]),o($Vk,[2,53]),{7:[1,77]},o($Vk,[2,55]),o($Vi,[2,46]),o($V4,[2,16],{32:62,7:$Vg,33:$Vh}),o($V4,[2,32],{27:50,18:78,7:$Vd,10:$Ve,33:$Vc}),o($V4,[2,31],{32:62,7:$Vg,33:$Vh}),o($Vj,[2,42]),{24:[1,79]},o($V4,[2,13],{32:62,7:$Vg,33:$Vh}),o($V4,[2,23],{28:41,18:80,7:$Va,29:$Vb,33:$Vc}),o($V4,[2,27],{27:50,18:81,7:$Vd,10:$Ve,33:$Vc}),o($V4,[2,22],{32:62,7:$Vg,33:$Vh}),o($V4,[2,26],{32:62,7:$Vg,33:$Vh}),o($Vk,[2,54]),o($V4,[2,33],{32:62,7:$Vg,33:$Vh}),{7:[1,82]},o($V4,[2,24],{32:62,7:$Vg,33:$Vh}),o($V4,[2,28],{32:62,7:$Vg,33:$Vh}),{10:$V7,16:84,25:[1,83]},{7:[1,85]},{7:$Vd,10:$Ve,25:[1,86],27:50},o($V4,[2,35],{16:87,10:$V7}),{7:[1,88]},o($V4,[2,37],{27:50,7:$Vd,10:$Ve}),o($V4,[2,36],{16:89,10:$V7}),o($V4,[2,38],{27:50,7:$Vd,10:$Ve})],
defaultActions: {},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

let invokes        =[];
let z              ={};
z.initial          ="";
z.context          ={};
z.states           ={};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:return 14
break;
case 2:return 12
break;
case 3:return 21
break;
case 4:return 22
break;
case 5:return 23
break;
case 6:return 24
break;
case 7:return 25
break;
case 8:return 31
break;
case 9:return 33
break;
case 10:return 20
break;
case 11:return 8
break;
case 12:return 7
break;
case 13:return 15
break;
case 14:return 10
break;
case 15:return 6
break;
case 16:return 29
break;
case 17:return 4
break;
case 18:return 5
break;
}
},
rules: [/^(?:\s+)/,/^(?:\*)/,/^(?:context\b)/,/^(?:invoke:)/,/^(?:id:)/,/^(?:src:)/,/^(?:ondone:)/,/^(?:onerror:)/,/^(?:entry:)/,/^(?:exit:)/,/^(?:final\b)/,/^(?:[0-9]+)/,/^(?:[a-z]+)/,/^(?:[A-Z0-9]+)/,/^(?::)/,/^(?:")/,/^(?:@)/,/^(?:\[)/,/^(?:\])/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = grammarXstate;
exports.Parser = grammarXstate.Parser;
exports.parse = function () { return grammarXstate.parse.apply(grammarXstate, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}