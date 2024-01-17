const fs= require('fs').promises;
const { fileURLToPath } = require('url');
const filepath="C:\\Users\\hanma\\Desktop\\assignments-master\\week-2\\01-async-js\\medium\\a.txt";
async function removeExtraSpaces(){
    try{
    const  filecontent= await fs.readFile(filepath,"utf-8" )
    const improved_string =filecontent.replace(/\s+/g, ' ').trim();
    console.log(improved_string);
    await fs.writeFile(filepath,improved_string,'utf-8')
    console.log("operation complete")

}
catch{
console.log(err)
}
}
removeExtraSpaces();