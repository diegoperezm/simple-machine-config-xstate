const prevEdges                       = [];

// I need to change this name
var show          = 'currentPath';
var hideNodesStr; 
var hideEdgesStr;  

function setHideNodes(str) {
    hideNodesStr = str;
}

function setHideEdges(str) {
    hideEdgesStr = str;
}

function setShow(str) {
  switch (str) {
  case 'path':
     show = 'path';
     break;
  default:
   show = 'currentPath';
  }
}

function hide(edges) {
 let tspanElements = document.getElementsByTagName('tspan');
 let tspanArr      = Array.from(tspanElements);  
 let v = edges[0];
 let w = edges[1];
 let arrow ; 
 let labelStyle;
 let name = edges[3]; 

 let edge = window.g.edge(v, w, name).elem;
 edge.children[0].setAttribute('class', 'edgePath hidden');
 arrow = document.getElementById(edge.children[1].children[0].id);
 arrow.children[0].style = "display: none";

 labelStyle = tspanArr.filter( elem => elem.__data__.name === name); 
 labelStyle[0].classList.add('hidden');
}


function hideEdges() {
 let tspanElements = document.getElementsByTagName('tspan');
 let tspanArr      = Array.from(tspanElements);  
 let arrow ; 
 let labelStyle;
 let removeEdges = edgeList[1].filter(elem => elem[3].includes(hideEdgesStr));  

  removeEdges.forEach( elem => hide(elem)); 
};

/**
 *
 *  (I need to change this name) 
 * 
 * This one is for change the function
 * (that highlight the edges of the graph) 
 *  without re-write the function call 
 *  inside interpret().onTransition() 
 * 
 *  BUGS:
 * - 1:
 *   show = 'path'; at the start of execution  
 *   and later  
 *   show = 'currentPath';
 *   leaves initial state permanently highlighted 
 * ---------- 
 * 
 * - 2:
 *   show='path';  
 *   some transitions
 *   show='currentPath';
 *   leaves the edges highlighted  
 */

//setHideEdges('reset');

const showFn = (state) =>  {
    let input = state.event.type;
    let w     = state.value;

    if(show === 'currentPath' && hideEdgesStr != undefined) {
      hideEdges();
      highlightNodes(input,w);
      highlightCurrentPath(input, w);
      hideEdges();

    } else if(show === 'path' && hideEdgesStr != undefined) {
      hideEdges();
      highlightNodes(input, w);
      highlightPath(input,  w);   
      hideEdges();

   } else if(show === 'currentPath') {
      highlightNodes(input,w);
      highlightCurrentPath(input,w);     

   } else if(show === 'path'){
      highlightNodes(input,w);
      highlightPath(input,w);   

  } 
      
}; 

function highlightNodes(input, w) {
 if(input === 'xstate.init') {
    window.g.node(w).elem.style = "fill: red;";
 } else {
   window.g.node(w).elem.style = "fill: red;";
 }

}


function currentPathInitialState(input,w) {
 let v    = 'INITIAL';
 let name = (v+"-"+w+"-"+ input);
 let a = window.g.edge(v,w,name).elem;
 a.children[0].setAttribute('class', 'edgePath active');
 let arrow = document.getElementById(a.children[1].children[0].id);
 arrow.children[0].style = "stroke: red; fill: red";
 prevEdges.push([v,w,name]);
}

function currentPathRestOfState(input, w) {

 let tspanElements = document.getElementsByTagName('tspan');
 let tspanArr      = Array.from(tspanElements);  
 let v = prevEdges[0][1]; ;
 let name =  (v+"-"+w+"-"+ input);
 let labelStyle;   

 if(window.g.edge(v,w,name).elem != undefined) { 

 let a = window.g.edge(v,w, name).elem;
 a.children[0].setAttribute('class', 'edgePath active');

 let arrow = document.getElementById(a.children[1].children[0].id);
 arrow.children[0].style = "stroke: red; fill: red";

 labelStyle = tspanArr.filter( elem => elem.__data__.name === name); 
 labelStyle[0].classList.add('active');

 prevEdges.shift();
 prevEdges.push([v,w,name]);
 }

}

function clearPath() {

 let tspanElements = document.getElementsByTagName('tspan');
 let tspanArr      = Array.from(tspanElements);  
 let arrow ; 
 let labelStyle;

 let v     = prevEdges[0][0];
 let w     = prevEdges[0][1];
 let name  = prevEdges[0][2]; 


 if(!prevEdges[0][2].includes(hideEdgesStr) ) {
   let  a    = window.g.edge(v,w,name).elem;
   a.children[0].setAttribute('class', 'edgePath');
   window.g.node(w).elem.style = "fill: black";

   arrow = document.getElementById(a.children[1].children[0].id);
   arrow.children[0].style = "stroke: black; fill: black";

   labelStyle = tspanArr.filter( elem => elem.__data__.name === name); 
   labelStyle[0].classList.remove('active');
 }
   
}



function pathInitialState(input, w) {
  let arrow;
  let v    = 'INITIAL';
  let name = (v+"-"+w+"-"+ input);
  let a = window.g.edge(v,w,name).elem;

  a.children[0].setAttribute('class', 'edgePath active');
  arrow = document.getElementById(a.children[1].children[0].id);
  arrow.children[0].style = "stroke: red; fill: red";
  prevEdges.push([v,w,name]);
}


function pathRestOfState(input, w) {
  let tspanElements = document.getElementsByTagName('tspan');
  let tspanArr      = Array.from(tspanElements);  
  let v    =  prevEdges[0][1];
  let name =  (v+"-"+w+"-"+ input);

  let a    =  window.g.edge(v,w, name).elem;
              a.children[0].setAttribute('class', 'edgePath active');

  let arrow = document.getElementById(a.children[1].children[0].id);
      arrow.children[0].style = "stroke: red; fill: red";

  let labelStyle = tspanArr.filter( elem => elem.__data__.name === name); 
      labelStyle[0].classList.add('active');

      prevEdges.shift();
      prevEdges.push([v,w,name]);
}


/**
 * This is a simple/naive implementation, first draft etc.:
 *
 *  is not tested (only "works")
 * 
 */
function highlightCurrentPath(input, w) {
   if(input === 'xstate.init') {
       currentPathInitialState(input, w);
   } else {
       clearPath();
       currentPathRestOfState(input, w);
   }

}

function highlightPath(input,w) {
  if(input === 'xstate.init') {
      pathInitialState(input, w);
   } else {
      pathRestOfState(input,w);
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
