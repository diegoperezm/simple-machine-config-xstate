/**
 *
 *                      SETUP
 *
 *
 **/

   const { Machine,  interpret, assign } = XState;
   const ParserXstate                    = grammarXstate.Parser;
   const parserXstate                    = new ParserXstate(grammarXstate);
   const createMachineConf               = input => parserXstate.parse(input);
   const ParserDagredD3                  = grammarDagreD3.Parser;
   const parserDagredD3                  = new ParserDagredD3(grammarDagreD3);

   const svgGraph                       = document.getElementById("svgGraph");

   const calcDisplay                     = document.getElementById("display");
   const seven                           = document.getElementById("seven");
   const eight                           = document.getElementById("eight");
   const nine                            = document.getElementById("nine");
   const multiply                        = document.getElementById("multiply");
   const add                             = document.getElementById("add" );
   const four                            = document.getElementById("four");
   const five                            = document.getElementById("five");
   const six                             = document.getElementById("six" );
   const divide                          = document.getElementById("divide" );
   const one                             = document.getElementById("one");
   const two                             = document.getElementById("two");
   const three                           = document.getElementById("three");
   const minus                           = document.getElementById("subtract");
   const zero                            = document.getElementById("zero");
   const equals                          = document.getElementById("equals");
   const dot                             = document.getElementById("decimal");
   const ce                              = document.getElementById("clear");

   const tableState                      = document.getElementById("table__state");
   const tableData                       = document.getElementById("table__data");
   const tableOpnd1                      = document.getElementById("table__opnd1");
   const tableOperator                   = document.getElementById("table__operator");
   const tableOpnd2                      = document.getElementById("table__opnd2");


   
   const input = {
      seven:    {type: "number",   payload: 7  },
      eight:    {type: "number",   payload: 8  },
      nine :    {type: "number",   payload: 9  },
      add  :    {type: "oprtr",    payload:"+" },
      multiply: {type: "oprtr",    payload:"X" },
      four:     {type: "number",   payload: 4  },
      five:     {type: "number",   payload: 5  },
      six:      {type: "number",   payload: 6  },
      divide:   {type: "oprtr",    payload:"/" },
      one:      {type: "number",   payload: 1  },
      two:      {type: "number",   payload: 2  },
      three:    {type: "number",   payload: 3  },
      minus:    {type: "minus",    payload:"-" },
      zero :    {type: "zero",     payload: 0  },
      equals:   {type: "equals",   payload: "="},
      dot:      {type: "dot",      payload: "."},
      ce:       {type: "ce",                   }
   };



   

/**
 *
 *                                   FINITE STATE  MACHINE
 *
 *
 **/

function calculate(ctx) {
  let opnd1    = ctx.opnd1.join("");
  let oprtr    = ctx.oprtr.join("");
  let opnd2    = ctx.opnd2.join("");

  switch (oprtr) {
    case "+":
      return  [(+opnd1 + +opnd2)];
    case "-":
      return  [(+opnd1 - +opnd2)];
    case "X":
      return  [(+opnd1 * +opnd2)];
    case "/":
      return  [(+opnd1 / +opnd2)];
    default:
      return "error";
  }
}



  const options = {
    actions: {
      setdata:                assign({data:     (ctx,evt) => ctx.data.concat(evt.payload)}),
      setdatazero:            assign({data:     (ctx,evt) => [0]}),
      setopnd1:               assign({opnd1:    (ctx,evt) => ctx.opnd1.concat(evt.payload)}),
      setopnd1zerodot:        assign({opnd1:   (ctx,evt) =>  [0, '.']}),
      setdataempt:            assign({data:     (ctx,evt) => []}),
      setopnd1empt:           assign({opnd1:    (ctx,evt) => []}),
      setopnd1result:         assign({opnd1:    (ctx,evt) => calculate(ctx)}),
      setoprtr:               assign({oprtr:    (ctx,evt) => ctx.oprtr.concat(evt.payload)}),

      setlastdata:           assign({data:      (ctx,evt) => {
                                 let prevDataItem   = ctx.data.pop();
                                 return ctx.data.concat(evt.payload);}
                               }),


      setlastoprtr:           assign({oprtr:    (ctx,evt) => {
                                 let prevOprtItem   = ctx.oprtr.pop();
                                 return ctx.oprtr.concat(evt.payload);},
                               }),

      setopnd2:               assign({opnd2:    (ctx,evt) => ctx.opnd2.concat(evt.payload)}),
      setoprtrempt:           assign({oprtr:    (ctx,evt) => []}),
      setopnd2empt:           assign({opnd2:    (ctx,evt) => []}),
      calculate:              assign({data:     (ctx,evt) => calculate(ctx)}),
      displaydata:            (ctx) => calcDisplay.textContent = ctx.data.join(""),
    },
     services: {}
   };


/**
 *   https://xstate.js.org/docs/guides/actions.html#action-order
 *
 *   "The order of actions should not necessarily matter ... However,
 *    the order of actions in the state.actions array is:
 *    1 exit actions - 2 transition - 3 entry actions"
 *
 *
 *    Abbreviations:
 *
 *   - OPND               OPERAND
 *   - OPRTR              OPERATOR
 *
 */
   const stateTransitionTable =
`
context:
      data: [ 0 ]
     opnd1: []
     oprtr: []
     opnd2: []

 *START           number       OPND1         entry: displaydata   :setlastdata     :setopnd1             exit: displaydata
  START           zero         OPND1ZERO                          :setlastdata     :setopnd1             exit: displaydata
  START           minus        OPND1MINUS                         :setlastdata     :setopnd1             exit: displaydata
  START           dot          OPND1DOT                           :setdata         :setopnd1zerodot      exit: displaydata

  OPND1           number       OPND1                              :setdata         :setopnd1             exit: displaydata 
  OPND1           zero         OPND1                              :setdata         :setopnd1             exit: displaydata
  OPND1           oprtr        OPRTR                              :setdata         :setoprtr             exit: displaydata
  OPND1           minus        OPRTR                              :setdata         :setoprtr             exit: displaydata
  OPND1           dot          OPND1DOT                           :setdata         :setopnd1             exit: displaydata
  OPND1           ce           START                              :setdatazero     :setopnd1empt
                                                                  :setoprtrempt    :setopnd2empt        

  OPND1MINUS      number       OPND1                              :setdata         :setopnd1             exit: displaydata
  OPND1MINUS      zero         OPND1ZERO                          :setdata         :setopnd1             exit: displaydata
  OPND1MINUS      ce           START                              :setdatazero     :setopnd1empt
                                                                  :setoprtrempt    :setopnd2empt        
                                           
  OPND1DOT        number       OPND1DOT                           :setdata         :setopnd1             exit: displaydata
  OPND1DOT        zero         OPND1DOT                           :setdata         :setopnd1             exit: displaydata
  OPND1DOT        oprtr        OPRTR                              :setdata         :setoprtr             exit: displaydata
  OPND1DOT        minus        OPRTR                              :setdata         :setoprtr             exit: displaydata
  OPND1DOT        ce           START                              :setdatazero     :setopnd1empt
                                                                  :setoprtrempt    :setopnd2empt        

  OPND1ZERO       dot          OPND1DOT                           :setdata         :setopnd1             exit: displaydata
  OPND1ZERO       ce           START                              :setdatazero     :setopnd1empt
                                                                  :setoprtrempt    :setopnd2empt        

  OPRTR           number       OPND2                              :setdata         :setopnd2             exit: displaydata
  OPRTR           zero         OPND2ZERO                          :setdata         :setopnd2             exit: displaydata
  OPRTR           oprtr        LASTOPRTR                          :setlastdata     :setlastoprtr         exit: displaydata
  OPRTR           minus        OPND2MINUS                         :setdata         :setopnd2             exit: displaydata
  OPRTR           ce           START                              :setdatazero     :setopnd1empt 
                                                                  :setoprtrempt    :setopnd2empt         


  LASTOPRTR       number       OPND2                              :setdata         :setopnd2             exit: displaydata
  LASTOPRTR       oprtr        LASTOPRTR                          :setlastdata     :setlastoprtr         exit: displaydata
  LASTOPRTR       zero         OPND2ZERO                          :setdata         :setopnd2             exit: displaydata
  LASTOPRTR       minus        OPND2MINUS                         :setdata         :setopnd2             exit: displaydata
  LASTOPRTR       ce           START                              :setdatazero     :setopnd1empt 
                                                                  :setoprtrempt    :setopnd2empt        

  OPND2           number       OPND2                              :setdata         :setopnd2             exit: displaydata
  OPND2           zero         OPND2                              :setdata         :setopnd2             exit: displaydata
  OPND2           equals       RESULT                             :calculate       :displaydata
  OPND2           dot          OPND2DOT                           :setdata         :setopnd2             exit: displaydata
  OPND2           oprtr        OPRTR                              :setdata         :setopnd1result          
                                                                  :setlastoprtr    :setopnd2empt         exit: displaydata

  OPND2           minus        OPRTR                              :setdata         :setopnd1result          
                                                                  :setlastoprtr    :setopnd2empt         exit: displaydata

  OPND2           ce           START                              :setdatazero     :setopnd1empt 
                                                                  :setoprtrempt    :setopnd2empt        


  OPND2MINUS      zero         OPND2ZERO                          :setdata         :setopnd2             exit: displaydata
  OPND2MINUS      number       OPND2                              :setdata         :setopnd2             exit: displaydata

  
  OPND2MINUS      oprtr        LASTOPRTR                          :setlastdata     :setlastoprtr         
                                                                  :setopnd2empt                          exit: displaydata

  OPND2MINUS      ce           START                              :setdatazero     :setopnd1empt 
                                                                  :setoprtrempt    :setopnd2empt        

  OPND2DOT        number       OPND2DOT                           :setdata         :setopnd2             exit: displaydata
  OPND2DOT        zero         OPND2DOT                           :setdata         :setopnd2             exit: displaydata
  OPND2DOT        oprtr        OPRTR                              :setdata         :setoprtr             exit: displaydata
  OPND2DOT        equals       RESULT                             :calculate       :displaydata

  OPND2DOT        ce           START                              :setdatazero     :setopnd1empt 
                                                                  :setoprtrempt    :setopnd2empt        

  OPND2ZERO       dot          OPND2DOT                           :setdata         :setopnd2             exit: displaydata
  OPND2ZERO       ce           START                              :setdatazero     :setopnd1empt 
                                                                  :setoprtrempt    :setopnd2empt  


  RESULT          oprtr        OPRTR                              :setdata         :setopnd1result          
                                                                  :setlastoprtr    :setopnd2empt         exit: displaydata

  RESULT          ce           START                              :setdatazero     :setopnd1empt 
                                                                  :setoprtrempt    :setopnd2empt
 `;




   const calcMachineConf      = createMachineConf(stateTransitionTable);

   const calcMachine          = Machine(calcMachineConf,options);

   const calcMachineService   = interpret(calcMachine)
        .onTransition(state => {
          tableState.textContent    = state.value;
          tableData.textContent     = state.context.data;
          tableOpnd1.textContent    = state.context.opnd1;
          tableOperator.textContent = state.context.oprtr;
          tableOpnd2.textContent    = state.context.opnd2;
          showFn(state);
        }
    );

/**
 *                                  EVENTS
 *
 **/
   seven.addEventListener('click',   () => calcMachineService.send(input.seven    ));
   eight.addEventListener('click',   () => calcMachineService.send(input.eight    ));
   nine.addEventListener('click',    () => calcMachineService.send(input.nine     ));
   multiply.addEventListener('click',() => calcMachineService.send(input.multiply ));
   add.addEventListener('click',     () => calcMachineService.send(input.add      ));
   four.addEventListener('click',    () => calcMachineService.send(input.four     ));
   five.addEventListener('click',    () => calcMachineService.send(input.five     ));
   six.addEventListener('click',     () => calcMachineService.send(input.six      ));
   divide.addEventListener('click',  () => calcMachineService.send(input.divide   ));
   one.addEventListener('click',     () => calcMachineService.send(input.one      ));
   two.addEventListener('click',     () => calcMachineService.send(input.two      ));
   three.addEventListener('click',   () => calcMachineService.send(input.three    ));
   minus.addEventListener('click',   () => calcMachineService.send(input.minus    ));
   zero.addEventListener('click',    () => calcMachineService.send(input.zero     ));
   equals.addEventListener('click',  () => calcMachineService.send(input.equals   ));
   dot.addEventListener('click',     () => calcMachineService.send(input.dot      ));
   ce.addEventListener('click',      () => calcMachineService.send(input.ce       ));

/**
 *
 *                                  GRAPH
 *
 *
 **/

   var g = new dagreD3.graphlib.Graph({multigraph: true}).setGraph({rankdir: 'LR'});

   let edgeList = parserDagredD3.parse(stateTransitionTable);

   graphSetStatesEdges(edgeList);

   var svg = d3.select("svg"), inner = svg.select("g");

   // Set up zoom support
   var zoom = d3.zoom().on("zoom", function() {
         inner.attr("transform", d3.event.transform);
       });

   svg.call(zoom);

   // Create the renderer
   var render = new dagreD3.render();

   // Run the renderer. This is what draws the final graph.
   render(inner, g);

    // Center the graph
   var initialScale = 0.7;

   svgGraphInfo  =  svgGraph.getBBox();

   svg.call(
     zoom.transform,
     d3.zoomIdentity.translate((svgGraphInfo.width) / 100, 50).scale(initialScale));
     svg.attr('height', svgGraphInfo.height - (window.innerHeight/2.5));

/**
 *
 *      MAIN
 *
 **/

 calcMachineService.start();



