# simple-machine-config-xstate
> A simple dsl (?) to write machine configurations for xstate

According to the  [xstate](https://github.com/davidkpiano/xstate) documentation  a  machine config is the same as the state node config with the addition of some properties, a state node:

> ... specifies a state configuration. They are defined on the machine's states property. Likewise, sub-state nodes are hierarchically defined on the states property of a state node.

The idea of this project is to write a simplified version of an xstate machine config.

> 🚧 Still Work in progress 🚧 

- Example of xstate machine config:


``` javascript
let trafficlight = {
   initial: "GREEN",
    context: {
       color:"green"},
    states: {
       GREEN: {
	      entry: ['displaycolor'],
	       exit: ['setcoloryellow'],
          on: {
	   time: {
	    target: "YELLOW"
	    }
         }
       },
      YELLOW: {
          entry: ['displaycolor'],
	       exit: ['setcolorred'],
       on: {
        time: {
	  target: "RED"
	    }
        }
      },
      RED: {
          entry: ['displaycolor'],
	       exit: ['setcolorgreen'],
        on: {
	 time: {
	   target: "GREEN"
	 } 
	 }
    }
  }
};
```

- Using this project:


  - Code:

![diagram code](diagram_code.png)

  - Graph (png): 


![graph image](graph.png)



### Initial Configuration


``` shell
npm i
```

# Demo/Example

[Traffic lights](https://diegoperezm.github.io/simple-machine-config-xstate/examples/browser/trafficlights/index.html)
