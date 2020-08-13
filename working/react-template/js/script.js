const {Machine, assign} = XState;

function Keypad  ({send})  {
    const  ids =
    [
	[ "seven",     7,  {type: "number",   data: 7}],
        [ "eight",     8,  {type: "number",   data: 8}],
        [ "nine" ,     9,  {type: "number",   data: 9}],
        [ "multiply", "X", {type: "operator", data:"*"}],
        [ "add",      "+", {type: "operator", data:"+"}],
       	[ "four",      4,  {type: "number",   data: 4}],
        [ "five",      5,  {type: "number",   data: 5}],
        [ "six",       6,  {type: "number",   data: 6}],
        [ "divide",   "/", {type: "operator", data: "/"}],
        [ "subtract", "-", {type: "minus" ,   data:"-"}],
       	[ "one",       1,  {type: "number",   data: 1}],
        [ "two",       2,  {type: "number",   data: 2}],
        [ "three",     3,  {type: "number",   data: 3}],
        [ "zero",      0,  {type: "zero",     data: 0}],
        [ "decimal",  ".", {type: "dot",      data:"."}],
       	["equals",    "=", {type: "equals",   data: "="}],
        ["ce",        "ce", {type: "ce"}]
    ];


    let buttons = ids.map( ele  =>  {
	let style = (ele[0] === "equals")
	    ? "keypad__key  keypad__key--big"
	    : "keypad__key";

	  return  <button
               	key={`${ele[0]}-id` }
              	className={style}
                id={ele[0]}
	        onClick = {() => send( ele[2])}
	      >
	    {ele[1]}
	   </button>;
    });

    return buttons;
};



function Display({value, operand1, operand2}) {
 let formattedData = value.map(elem => (elem === "*" ? "X" : elem));
 let style = "display display__number";
   
    if( value.length       > 10 ||
	operand1.length > 10 ||
	operand2.length > 10 ||  
	value[0].toString().length > 10 
    ) {
           style = "display  display__number--small"; 
   }

  return (
       <p className={style} id="display">
	   {formattedData}
	</p>); 
}



const calcMachine = Machine(
  {
    id: "calculatorID",
    context: {
      data: [],
      result: "",
      operand1: [],
      operator: [],
      operand2: []
    },
    initial: "A",
    states: {
      A: {
        initial: "START",
        states: {
          RESULT: {
            id: "resultID",
            onEntry: [
              assign({ result: (ctx, evt) =>  calculate(ctx)}),
              assign({ operand1: (ctx, evt) => [ctx.result] }),
              assign({ operator: (ctx, evt) => [] }),
              assign({ operand2: (ctx, evt) => [] }),
              assign({ data: (ctx, evt) => [ctx.operand1] })
            ],
            on: {
              operator: {
                target: "#operatorEnteredID",
                actions: [
                  assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
                  assign({
                    operator: (ctx, evt) => ctx.operator.concat(evt.data)
                  }),
                ]
              },
              minus: {
                target: "#operatorEnteredID",
                actions: [
                  assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
                  assign({
                    operator: (ctx, evt) => ctx.operator.concat(evt.data)
                  }),
                ]
              },
              ce: {
                target: "#startID",
                actions: [
                  assign({ data: (ctx, evt) => [] }),
                  assign({ operand1: (ctx, evt) => [] }),
                ]
              }
            }
          },
          START: {
            id: "startID",
            onEntry: [
              assign({ data: (ctx, evt) => [0] }),
              assign({ operand1: (ctx, evt) => [0] }),
            ],
            on: {
              dot: {
                target: "#operand1ID.AFTERDECIMALPOINT",
                actions: [
                  assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
                  assign({
                    operand1: (ctx, evt) => ctx.operand1.concat(evt.data)
                  }),
                ]
              },
              zero: {
                target: "#operand1ID.ZERO",
              },
              number: {
                target: "#operand1ID.BEFOREDECIMALPOINT",
                actions: [
                  assign({ data: (ctx, evt) => [] }),
                  assign({ operand1: (ctx, evt) => [] }),
                  assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
                  assign({
                    operand1: (ctx, evt) => ctx.operand1.concat(evt.data)
                  }),
                ]
              },
              minus: {
                target: "#NEG1ID",
                actions: [
                  assign({ data: (ctx, evt) => [] }),
                  assign({ operand1: (ctx, evt) => [] }),
                  assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
                  assign({
                    operand1: (ctx, evt) => ctx.operand1.concat(evt.data)
                  }),
                ]
              },
              ce: {
                target: "#startID",
                actions: [
                  assign({ data: (ctx, evt) => [0] }),
                  assign({ operand1: (ctx, evt) => [0] }),
                ]
              }
            }
          }
        }
      },
      OPERAND1: {
        id: "operand1ID",
        on: {
          ce: {
            target: "#startID",
            actions: [
              assign({ data: (ctx, evt) => [] }),
              assign({ operand1: (ctx, evt) => [] }),
              assign({ operator: (ctx, evt) => [] }),
              assign({ operand2: (ctx, evt) => [] }),
            ]
          },
          operator: {
            target: "#operatorEnteredID",
            actions: [
              assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
              assign({ operator: (ctx, evt) => ctx.operator.concat(evt.data) }),
            ]
          },
          minus: {
            target: "#operatorEnteredID",
            actions: [
              assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
              assign({ operator: (ctx, evt) => ctx.operator.concat(evt.data) }),
            ]
          }
        },
        states: {
          ZERO: {
            on: {
              number: {
                target: "BEFOREDECIMALPOINT",
                actions: [
                  assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
                  assign({
                    operand1: (ctx, evt) => ctx.operand1.concat(evt.data)
                  }),
                ]
              },
              dot: {
                target: "AFTERDECIMALPOINT",
                actions: [
                  assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
                  assign({
                    operand1: (ctx, evt) => ctx.operand1.concat(evt.data)
                  }),
                ]
              }
            }
          },
          BEFOREDECIMALPOINT: {
            on: {
              number: {
                target: "BEFOREDECIMALPOINT",
                actions: [
                  assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
                  assign({
                    operand1: (ctx, evt) => ctx.operand1.concat(evt.data)
                  }),
                ]
              },
              zero: {
                target: "BEFOREDECIMALPOINT",
                actions: [
                  assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
                  assign({
                    operand1: (ctx, evt) => ctx.operand1.concat(evt.data)
                  }),
                ]
              },
              dot: {
                target: "AFTERDECIMALPOINT",
                actions: [
                  assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
                  assign({
                    operand1: (ctx, evt) => ctx.operand1.concat(evt.data)
                  }),
                ]
              }
            }
          },
          AFTERDECIMALPOINT: {
            on: {
              number: {
                target: "AFTERDECIMALPOINT",
                actions: [
                  assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
                  assign({
                    operand1: (ctx, evt) => ctx.operand1.concat(evt.data)
                  }),
                ]
              },
              zero: {
                target: "BEFOREDECIMALPOINT",
                actions: [
                  assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
                  assign({
                    operand1: (ctx, evt) => ctx.operand1.concat(evt.data)
                  }),
                ]
              }
            }
          }
        }
      },
      NEGSTART: {
        id: "NEG1ID",
        on: {
          number: {
            target: "#operand1ID.BEFOREDECIMALPOINT",
            actions: [
              assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
              assign({ operand1: (ctx, evt) => ctx.operand1.concat(evt.data) }),
            ]
          },
          zero: {
            target: "#operand1ID.ZERO",
            actions: [
              assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
              assign({ operand1: (ctx, evt) => ctx.operand1.concat(evt.data) }),
            ]
          },
          dot: {
            target: "#operand1ID.AFTERDECIMALPOINT",
            actions: [
              assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
              assign({ operand1: (ctx, evt) => ctx.operand1.concat(evt.data) }),
            ]
          },
          ce: {
            target: "#startID",
            actions: [
              assign({ data: (ctx, evt) => [] }),
              assign({ operand1: (ctx, evt) => [] }),
              assign({ operator: (ctx, evt) => [] }),
              assign({ operand2: (ctx, evt) => [] }),
            ]
          }
        }
      },
      OPERATORENTERED: {
        id: "operatorEnteredID",
        on: {
          ce: {
            target: "#startID",
            actions: [
              assign({ data: (ctx, evt) => [] }),
              assign({ operand1: (ctx, evt) => [] }),
              assign({ operator: (ctx, evt) => [] }),
              assign({ operand2: (ctx, evt) => [] }),
            ]
          },
          zero: {
            target: "#operand2ID.ZERO",
            actions: [
              assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
              assign({ operand2: (ctx, evt) => ctx.operand2.concat(evt.data) }),
            ]
          },
          number: {
            target: "#operand2ID.BEFOREDECIMALPOINT",
            actions: [
              assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
              assign({ operand2: (ctx, evt) => ctx.operand2.concat(evt.data) }),
            ]
          },
          operator: {
            target: "OPERATORENTERED",
            actions: [
              assign({
                data: (ctx, evt) => {
                  let dataPop = ctx.data.pop();
                  return ctx.data.concat(evt.data);
                }
              }),
              assign({
                operator: (ctx, evt) => {
                  let dataPop = ctx.operator.pop();
                  return ctx.operator.concat(evt.data);
                }
              }),
            ]
          },
          minus: {
            target: "#NEG2ID",
            actions: [
              assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
              assign({ operand2: (ctx, evt) => ctx.operand2.concat(evt.data) }),
            ]
          }
        }
      },
      NEGOPERATOR: {
        id: "NEG2ID",
        on: {
          number: {
            target: "#operand2ID.BEFOREDECIMALPOINT",
            actions: [
              assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
              assign({ operand2: (ctx, evt) => ctx.operand2.concat(evt.data) }),
            ]
          },
          zero: {
            target: "#operand2ID.ZERO",
            actions: [
              assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
              assign({ operand2: (ctx, evt) => ctx.operand2.concat(evt.data) }),
            ]
          },
          dot: {
            target: "#operand2ID.AFTERDECIMALPOINT",
            actions: [
              assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
              assign({ operand2: (ctx, evt) => ctx.operand2.concat(evt.data) }),
            ]
          },
          ce: {
            target: "#startID",
            actions: [
              assign({ data: (ctx, evt) => [] }),
              assign({ operand1: (ctx, evt) => [] }),
              assign({ operator: (ctx, evt) => [] }),
              assign({ operand2: (ctx, evt) => [] }),
            ]
          }
        }
      },
      OPERAND2: {
        id: "operand2ID",
        on: {
          ce: {
            target: "#startID",
            actions: [
              assign({ data: (ctx, evt) => [] }),
              assign({ operand1: (ctx, evt) => [] }),
              assign({ operator: (ctx, evt) => [] }),
              assign({ operand2: (ctx, evt) => [] }),
            ]
          },
          operator: {
            target: "#operatorEnteredID",
            actions: [
		assign({ result: (ctx, evt) =>  calculate(ctx) }),
              assign({ operand1: (ctx, evt) => [ctx.result] }),
              assign({ operand2: (ctx, evt) => [] }),
              assign({ data: (ctx, evt) => [ctx.operand1, evt.data] }),
              assign({ operator: (ctx, evt) => [evt.data] }),
            ]
          },
          minus: {
            target: "#operatorEnteredID",
            actions: [
		assign({ result: (ctx, evt) =>  calculate(ctx) }),
              assign({ operand1: (ctx, evt) => [ctx.result] }),
              assign({ operand2: (ctx, evt) => [] }),
              assign({ data: (ctx, evt) => [ctx.operand1, evt.data] }),
              assign({ operator: (ctx, evt) => [evt.data] }),

            ]
          },
          equals: {
            target: "#resultID"
          }
        },
        states: {
          ZERO: {
            on: {
              number: {
                target: "BEFOREDECIMALPOINT",
                actions: [
                  assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
                  assign({
                    operand2: (ctx, evt) => ctx.operand2.concat(evt.data)
                  }),
                ]
              },
              dot: {
                target: "AFTERDECIMALPOINT",
                actions: [
                  assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
                  assign({
                    operand2: (ctx, evt) => ctx.operand2.concat(evt.data)
                  }),
                ]
              }
            }
          },
          BEFOREDECIMALPOINT: {
            on: {
              number: {
                target: "BEFOREDECIMALPOINT",
                actions: [
                  assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
                  assign({
                    operand2: (ctx, evt) => ctx.operand2.concat(evt.data)
                  }),
                ]
              },
              zero: {
                target: "BEFOREDECIMALPOINT",
                actions: [
                  assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
                  assign({
                    operand2: (ctx, evt) => ctx.operand2.concat(evt.data)
                  }),
                ]
              },
              dot: {
                target: "AFTERDECIMALPOINT",
                actions: [
                  assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
                  assign({
                    operand2: (ctx, evt) => ctx.operand2.concat(evt.data)
                  }),
                ]
              }
            }
          },
          AFTERDECIMALPOINT: {
            on: {
              number: {
                target: "AFTERDECIMALPOINT",
                actions: [
                  assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
                  assign({
                    operand2: (ctx, evt) => ctx.operand2.concat(evt.data)
                  }),
                ]
              },
              zero: {
                target: "BEFOREDECIMALPOINT",
                actions: [
                  assign({ data: (ctx, evt) => ctx.data.concat(evt.data) }),
                  assign({
                    operand2: (ctx, evt) => ctx.operand2.concat(evt.data)
                  }),
                ]
              }
            }
          }
        }
      }
    }
  });



function Calculator() {
    const [state, send] =      useMachine(calcMachine);
    const [value, setValue] =  React.useState(state.context.data);

    React.useEffect(() => {
	setValue(state.context.data);
    }, [state.context.data]);

    return (
 <div className="App">
   <h1 className="title">Calculator</h1>
   <div className="container">
     <Display
	value={value}
 	operand1={state.context.operand1}
 	operand2={state.context.operand2}
      />
     <div className="keypad">
      <Keypad send={send} />
     </div>
   </div>
 </div>
    );
}

ReactDOM.render(
  <Calculator  />,
  document.getElementById('root')
);

