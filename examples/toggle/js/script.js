const { Machine,  interpret, assign  } = XState; // global variable: window.XState
const toggleButton = document.getElementById('toggleButton');
const toggleBox    = document.getElementById('toggleBox');
const actions = { actions: { classon: classOn, classoff: classOff}};
const toggleMachine = Machine(toggleConf,actions);
const toggleService = interpret(toggleMachine).onTransition(state => {console.log(state.value);});

toggleButton
  .addEventListener(
    'click',
     function () {
       toggleService.send('toggle');  
   });


toggleService.start();

function classOn() {
 toggleBox.classList.remove("off");
 toggleBox.classList.add("on");
}

function classOff() {
 toggleBox.classList.remove("on");
 toggleBox.classList.add("off");
}
