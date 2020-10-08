const fs=require('fs')
const fetch=require('node-fetch')
const path=require('path')
const packageJson = require('./package.json');
const colors = require('colors');


console.log(process.argv)
const greetingMessage=()=>{
console.log("This is command line tool");
console.log("if red links are not working");
console.log("if green links are working")
console.log("Run with a file name to process the file, run with the argument v or version to get the version of this tool")
}


if(process.argv.length == 2){
    greetingMessage();
    console.log("Hello");
}
else{ // more then 2

    if (process.argv[2] == "v" || process.argv[2] == "version") {
        console.log(packageJson.name + " Version " + packageJson.version);
    } else{

        const filePath=path.join(__dirname,process.argv[2])
        fs.readFile(filePath,'utf-8',(err,data)=>{
            if(err){
                console.log("Fail to read file",err)
            }
            else{
                const validUrl=data.match(/(http|https)(:\/\/)([\w+\-&@`~#$%^*.=/?:]+)/gi)
                validUrl.forEach((url)=>{
                fetch(url,{method:'HEAD',timeout:2000})
                .then((res)=>{
                    if(res.status==200)
                    console.log(res.status,url.green)
                    else if(res.status==400||res.status==404)
                    console.log(res.status,url.red)
                    else console.log(res.status,url)
                })
                .catch((error)=>{
                    console.log("404",url)
                })
            })
            }
        })  
    }
}