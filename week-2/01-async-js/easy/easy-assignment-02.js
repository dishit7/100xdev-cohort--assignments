let counter=0
function updateCounter ( ){
counter++;
console.log(counter); 
 
}
function startclock(){
setTimeout(()=>{
console.clear();
updateCounter();
startclock();
},500)
}
startclock();