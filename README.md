# simple-machine-config-xstate
> A simple dsl (?) to write machine configurations for xstate

According to the  [xstate](https://github.com/davidkpiano/xstate) documentation  a  machine config is the same as the state node config with the addition of some properties, a state node:

> ... specifies a state configuration. They are defined on the machine's states property. Likewise, sub-state nodes are hierarchically defined on the states property of a state node.

The idea of this project is to write a simplified version of an xstate machine config.

- Example of xstate machine config:

``` javascript
// ...
{
  states: {
    // state node
    idle: {
      on: {
        FETCH: 'pending';
      }
    }
  }
}
```

- Using this project:

```
 IDLE   fetch   PENDING  
```


- Another example of xstate machine config:


``` javascript
let trafficLight = {
   initial: "GREEN",
    context: {
       color:""},
    states: {
       GREEN: {
          on: {
	   time: {
	    target: "YELLOW",
            actions: ["setcolorgreen","displaycolor"]
	    }
         }
       },
      YELLOW: {
       on: {
        time: {
	  target: "RED",
          actions: ["setcoloryellow","displaycolor"]
	  }
        }
      },
      RED: {
        on: {
	 time: {
	   target: "GREEN",
           actions:["setcolorred","displaycolor"]
	   }
	 }
      }
   }
};
```

- Using this project:

``` 
context:
    color: ""

 *GREEN      time     YELLOW   :setcolorgreen
                               :displaycolor

  YELLOW     time     RED      :setcoloryellow
                               :displaycolor

  RED        time     GREEN    :setcolorred
                               :displaycolor
```



### Initial Configuration


``` shell
npm i
```



