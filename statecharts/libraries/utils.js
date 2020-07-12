/**
 * This is a simple/naive implementation, first draft etc.:
 *
 *  is not tested (only "works")
 * 
 */
function highlightCurrentPath(state,prevEdges) {
   if(state.event.type=== 'xstate.init') {
       v    = 'INITIAL';
       w    = state.value;
       name = (v+w+state.event.type);
       window.g.node(w).elem.style = "fill: red; ";
       a = window.g.edge(v,w, name ).elem;
       a.children[0].setAttribute('class', 'edgePath active');
       prevEdges.push([v,w,name]);
   }
   if(state.changed) {
      v    = prevEdges[0][0];
      w    = prevEdges[0][1];
      name = prevEdges[0][2]; 
      a = window.g.edge(v,w, name).elem;
      a.children[0].setAttribute('class', 'edgePath');
      window.g.node(w).elem.style = "fill: black";
       
      v    = w; 
      w    = state.value;
      name = (v+w+state.event.type);
      window.g.node(w).elem.style = "fill: red; ";
      a = window.g.edge(v,w, name).elem;
      a.children[0].setAttribute('class', 'edgePath active');
      prevEdges.shift();
       prevEdges.push([v,w,name]);
   }
}
