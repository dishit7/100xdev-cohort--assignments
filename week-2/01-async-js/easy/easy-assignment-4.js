const fs = require('fs').promises;
const filepath=`C:\\Users\\hanma\\Desktop\\assignments-master\\week-2\\01-async-js\\easy\\4-write-to-file.md`;
data='kem cho';
async function writeToFile(){
    try{
        await fs.writeFile(filepath,data);
            console.log('successfully wrote to the file');
        }
    
    catch(err){
         console.log("there was an error",err);
    }
}

writeToFile();