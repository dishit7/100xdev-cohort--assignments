const moment = require('moment');

 
function clock(){
setTimeout(()=>{
    const currentFormattedTime = moment().format('HH:mm:ss') ;
    console.log(currentFormattedTime);
    clock();
},1000)
}
clock();