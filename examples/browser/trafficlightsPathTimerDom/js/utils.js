function highlightCurrentPath(state) {
  let a;
  let v;
  let w;
  if(prevStateCurrState.length === 3) {
    v = prevStateCurrState[0];
    w = prevStateCurrState[1];
    a = window.g.edge(v,w).elem;
    a.children[0].setAttribute('class', 'edgePath');
    window.g.node(w).elem.style = "fill: black";
    prevStateCurrState.shift();
 }

    prevStateCurrState.push(state.value);
/**
 *  https://xstate.js.org/docs/guides/states.html#state-methods-and-properties
 *  A state is considered "changed" if:
 *   Its value is not equal to its previous value, or:
 *   It has any new actions (side-effects) to execute.    
*/
     if(state.changed) {
      v = prevStateCurrState[0];
      w = prevStateCurrState[1];
      window.g.node(w).elem.style = "fill: red; ";
      a = window.g.edge(v,w).elem;
      a.children[0].setAttribute('class', 'edgePath active');
    }

}
	
