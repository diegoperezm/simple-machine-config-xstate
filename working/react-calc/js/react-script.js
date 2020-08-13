/**
 *
 *                      SETUP
 *
 *
 **/

 const { Machine,  assign }   = XState;
 const ParserXstate           = grammarXstate.Parser;
 const parserXstate           = new ParserXstate(grammarXstate);
 const createMachineConf      = input => parserXstate.parse(input);



/**
 *
 *                                   FINITE STATE  MACHINE
 *
 *
 **/

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
    },
     services: {}
   };




 const stateTransitionTable =
`
context:
     data:  [0]
     opnd1: []
     oprtr: []
     opnd2: []

 *START           number       OPND1             :setlastdata     :setopnd1            
  START           zero         OPND1ZERO         :setlastdata     :setopnd1              
  START           minus        OPND1MINUS        :setlastdata     :setopnd1              
  START           dot          OPND1DOT          :setdata         :setopnd1zerodot       

  OPND1           number       OPND1             :setdata         :setopnd1               
  OPND1           zero         OPND1             :setdata         :setopnd1              
  OPND1           oprtr        OPRTR             :setdata         :setoprtr              
  OPND1           minus        OPRTR             :setdata         :setoprtr              
  OPND1           dot          OPND1DOT          :setdata         :setopnd1              
  OPND1           ce           START             :setdatazero     :setopnd1empt
                                                 :setoprtrempt    :setopnd2empt        

  OPND1MINUS      number       OPND1             :setdata         :setopnd1              
  OPND1MINUS      zero         OPND1ZERO         :setdata         :setopnd1              
  OPND1MINUS      ce           START             :setdatazero     :setopnd1empt
                                                 :setoprtrempt    :setopnd2empt        
                                           
  OPND1DOT        number       OPND1DOT          :setdata         :setopnd1              
  OPND1DOT        zero         OPND1DOT          :setdata         :setopnd1              
  OPND1DOT        oprtr        OPRTR             :setdata         :setoprtr              
  OPND1DOT        minus        OPRTR             :setdata         :setoprtr              
  OPND1DOT        ce           START             :setdatazero     :setopnd1empt
                                                 :setoprtrempt    :setopnd2empt        

  OPND1ZERO       dot          OPND1DOT          :setdata         :setopnd1              
  OPND1ZERO       ce           START             :setdatazero     :setopnd1empt
                                                 :setoprtrempt    :setopnd2empt        

  OPRTR           number       OPND2             :setdata         :setopnd2              
  OPRTR           zero         OPND2ZERO         :setdata         :setopnd2              
  OPRTR           oprtr        LASTOPRTR         :setlastdata     :setlastoprtr          
  OPRTR           minus        OPND2MINUS        :setdata         :setopnd2              
  OPRTR           ce           START             :setdatazero     :setopnd1empt 
                                                 :setoprtrempt    :setopnd2empt         

  LASTOPRTR       number       OPND2             :setdata         :setopnd2              
  LASTOPRTR       oprtr        LASTOPRTR         :setlastdata     :setlastoprtr          
  LASTOPRTR       zero         OPND2ZERO         :setdata         :setopnd2              
  LASTOPRTR       minus        OPND2MINUS        :setdata         :setopnd2              
  LASTOPRTR       ce           START             :setdatazero     :setopnd1empt 
                                                 :setoprtrempt    :setopnd2empt        

  OPND2           number       OPND2             :setdata         :setopnd2              
  OPND2           zero         OPND2             :setdata         :setopnd2              
  OPND2           equals       RESULT            :calculate   
  OPND2           dot          OPND2DOT          :setdata         :setopnd2              
  OPND2           oprtr        OPRTR             :setdata         :setopnd1result       
                                                 :setlastoprtr    :setopnd2empt          

  OPND2           minus        OPRTR             :setdata         :setopnd1result       
                                                 :setlastoprtr    :setopnd2empt          

  OPND2           ce           START             :setdatazero     :setopnd1empt 
                                                 :setoprtrempt    :setopnd2empt        

  OPND2MINUS      zero         OPND2ZERO         :setdata         :setopnd2              
  OPND2MINUS      number       OPND2             :setdata         :setopnd2              
  
  OPND2MINUS      oprtr        LASTOPRTR         :setlastdata     :setlastoprtr         
                                                 :setopnd2empt                           

  OPND2MINUS      ce           START             :setdatazero     :setopnd1empt 
                                                 :setoprtrempt    :setopnd2empt        

  OPND2DOT        number       OPND2DOT          :setdata         :setopnd2              
  OPND2DOT        zero         OPND2DOT          :setdata         :setopnd2              
  OPND2DOT        oprtr        OPRTR             :setdata         :setoprtr              
  OPND2DOT        equals       RESULT            :calculate    

  OPND2DOT        ce           START             :setdatazero     :setopnd1empt 
                                                 :setoprtrempt    :setopnd2empt        

  OPND2ZERO       dot          OPND2DOT          :setdata         :setopnd2              
  OPND2ZERO       ce           START             :setdatazero     :setopnd1empt 
                                                 :setoprtrempt    :setopnd2empt  

  RESULT          oprtr        OPRTR             :setdata         :setopnd1result       
                                                 :setlastoprtr    :setopnd2empt          

  RESULT          ce           START             :setdatazero     :setopnd1empt 
                                                 :setoprtrempt    :setopnd2empt
 `;



/**
 *
 *                      LOGIC
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


/**
 *
 *                      COMPONENTS
 *
 *
 **/


function Display({value}) {
    return <p id="display" className="calc__display">{value}</p>;
}


function Keypad  ({send}) {
    const  ids =
    [
        [ "seven",      7,  {type: "number",  payload:   7}],
        [ "eight",      8,  {type: "number",  payload:   8}],
        [ "nine" ,      9,  {type: "number",  payload:   9}],
        [ "subtract", "-",  {type: "minus" ,  payload: "-"}],
        [ "divide",   "/",  {type: "oprtr",   payload: "/"}],
        [ "add",      "+",  {type: "oprtr",   payload: "+"}],
        [ "multiply", "X",  {type: "oprtr",   payload: "X"}],
        [ "four",       4,  {type: "number",  payload:   4}],
        [ "five",       5,  {type: "number",  payload:   5}],
        [ "six",        6,  {type: "number",  payload:   6}],
        [ "one",        1,  {type: "number",  payload:   1}],
        [ "two",        2,  {type: "number",  payload:   2}],
        [ "three",      3,  {type: "number",  payload:   3}],
        [ "zero",       0,  {type: "zero",    payload:   0}],
        [ "decimal",  ".",  {type: "dot",     payload: "."}],
        ["clear",    "ce",  {type: "ce"}],
        ["equals",    "=",  {type: "equals",  payload: "="}]
    ];

    let buttons = ids.map( ele  =>  {

       let style;
          switch (ele[0]) {
            case "equals":
              style = "key key--equals";
            break;
            case "minus":
              style = "key key--minus";
            break;
            case "divide":
              style = "key key--divide";
            break;
            case "add":
              style = "key key--add";
            break;
            case "multiply":
              style = "key key--multiply";
            break;
             case "ce":
              style = "key key--ce";
            break;
            default:
              style = "key";
           }

          return  <button
                     key={`${ele[0]}-id` }
                     className={style}
                     id={ele[0]}
                     onClick = {() => send( ele[2] )}
                  >
                  {ele[1]}
                  </button>;
   });

   return buttons;
};



function Calculator() {
    const calcMachineConf      = createMachineConf(stateTransitionTable);
    const calcMachine          = Machine(calcMachineConf,options);
    const [state,     send]    =  useMachine(calcMachine);
    const [value, setValue]    =  React.useState(state.context.data);

    React.useEffect( () => { setValue(state.context.data);}, [state.context.data]);

 
    return (
         <div className="container">
            <div className="content">
              <div className="calc">
                 <Display
                   value={value}
                 />
              <div className="calc__keys">
                <Keypad send={send}/>
              </div>
             </div>
           </div>
       </div>);
 }


/**
 *
 *                      RENDER
 *
 *
 **/



ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
);

