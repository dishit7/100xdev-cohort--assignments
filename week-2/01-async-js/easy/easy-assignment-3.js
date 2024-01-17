const fs= require('fs');
const filepath=`C:\\Users\\hanma\\Desktop\\assignments-master\\week-2\\01-async-js\\easy\\3-read-from-file.md` ;

const readfile = (filepath)=>{
    return new Promise ((resolve,reject)=>{
    fs.readFile(filepath,"utf-8",(err,data)=>{
    if(err){
        reject(err);
    }
    else{
        resolve(data);
    }
})
})
 }
 const performExpensiveOperation=(content)=>{
    return new Promise((resolve)=>{
    setTimeout(()=>{
        const result=content.toUpperCase();
        resolve (result);
    },2000)
    })
 }
  
const performTask=async ()=>{
    try{
        const filecontents= await readfile(filepath);
        console.log(filecontents);
        const result= await performExpensiveOperation(filecontents);
        console.log("expensive operation result",result)
    }
    catch(error){
        console.log(`error`+error)
    }
}


performTask();