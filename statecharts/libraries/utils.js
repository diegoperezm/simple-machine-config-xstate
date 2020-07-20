const prevEdges                       = [];

/**
 * This is a simple/naive implementation, first draft etc.:
 *
 *  is not tested (only "works")
 * 
 */
function highlightCurrentPath(state) {
    let tspanElements = document.getElementsByTagName('tspan');
    let tspanArr      = Array.from(tspanElements);  
    let a;
    let input;
    let v;
    let w;
    let name;
    let labelStyle;
    let arrow; 

   if(state.event.type=== 'xstate.init') {
       input= state.event.type; 
       v    = 'INITIAL';
       w    = state.value;
       name = (v+"-"+w+"-"+state.event.type);
       window.g.node(w).elem.style = "fill: red; ";
       a = window.g.edge(v,w,name).elem;
       a.children[0].setAttribute('class', 'edgePath active');

       arrow = document.getElementById(a.children[1].children[0].id);
       arrow.children[0].style = "stroke: red; fill: red";

       prevEdges.push([v,w,name]);

   }
   if(state.changed) {
      v    = prevEdges[0][0];
      w    = prevEdges[0][1];
      name = prevEdges[0][2]; 
      a = window.g.edge(v,w,name).elem;
      a.children[0].setAttribute('class', 'edgePath');
      window.g.node(w).elem.style = "fill: black";

      arrow = document.getElementById(a.children[1].children[0].id);
      arrow.children[0].style = "stroke: black; fill: black";

      labelStyle = tspanArr.filter( elem => elem.__data__.name === name); 
      labelStyle[0].classList.remove('active');

      v    = w; 
      w    = state.value;
      name = (v+"-"+w+"-"+state.event.type);
      window.g.node(w).elem.style = "fill: red; ";
      a = window.g.edge(v,w, name).elem;
      a.children[0].setAttribute('class', 'edgePath active');

      arrow = document.getElementById(a.children[1].children[0].id);
      arrow.children[0].style = "stroke: red; fill: red";

      labelStyle = tspanArr.filter( elem => elem.__data__.name === name); 
      labelStyle[0].classList.add('active');

      prevEdges.shift();
      prevEdges.push([v,w,name]);

   }
}


function graphSetStatesEdges(arr) {
 let states = arr[0];
 let edges  = arr[1];
  
states.forEach(function(state) {
   if(state === "FINAL" || state === 'INITIAL') {
     g.setNode(state, { label: "" }); 
     g.node(state).style = "fill: #333";
   } else {
     g.setNode(state, { label: state }); 
   }
   });

   edges.forEach(
     function(ele) {
       g.setEdge(
         {v: ele[0],
          w: ele[1],
          name: ele[3]},
         {label: ele[2]});});

   // Set some general styles
   g.nodes().forEach(function(v) {
     var node = g.node(v);
     node.rx = node.ry = 10;
   });
}

