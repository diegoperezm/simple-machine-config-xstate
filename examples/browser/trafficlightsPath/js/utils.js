
/**
 * This is a simple/naive implementation, first draft etc.:
 *
 *  is not tested (only "works")
 * 
 */
function highlightCurrentPath(state, prevStateCurrState) {
  let a;
  let v;
  let w;

   if(prevStateCurrState[0] === 'INITIAL' && prevStateCurrState.length === 1 ) {
     prevStateCurrState.push(state.value);
     v = prevStateCurrState[0];
     w = prevStateCurrState[1];
     window.g.node(w).elem.style = "fill: red; ";
     a = window.g.edge(v,w).elem;
     a.children[0].setAttribute('class', 'edgePath active');
   }

   
/**
 *   https://xstate.js.org/docs/guides/states.html#state-methods-and-properties
 *   A state is considered "changed" if:
 *   Its value is not equal to its previous value, or:
 *   It has any new actions (side-effects) to execute.    
*/
    if(state.changed) {
      v = prevStateCurrState[0];
      w = prevStateCurrState[1];
      a = window.g.edge(v,w).elem;
      a.children[0].setAttribute('class', 'edgePath');
      window.g.node(w).elem.style = "fill: black";

      prevStateCurrState.push(state.value);

      if(prevStateCurrState.length === 3) {
        prevStateCurrState.shift();
        v = prevStateCurrState[0];
        w = prevStateCurrState[1];
        window.g.node(w).elem.style = "fill: red; ";
        a = window.g.edge(v,w).elem;
        a.children[0].setAttribute('class', 'edgePath active');

      }
    }
 }




