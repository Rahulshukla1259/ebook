//const bodyParser = require("body-parser");
const bodyParser = require("body-parser");
let express= require("express")

let path = require("path")

let fs = require("fs")

let app=express();

app.use(express.json())

app.use(express.static("public"))

app.use(express.urlencoded({ extended: true }));



app.listen(3000)

app.get("/page",(req,res)=>{
    
    const options = {
        root: path.join(__dirname)
    }
    res.sendFile("./public/index.html",options)
})

app.post("/page",(req,res)=>{

    let bookarr=[]

    fs.readFile("book.txt","utf-8",(err,data)=>{

        for (let i = 0; i < 20; i++) {
            bookarr.push({page:data.slice(2*i*100,(2*i+2)*100)})
            
        }

       res.send(bookarr)
        

    })

 

})


app.get("/fetch",(req,res)=>{

    fetch("https://github.com/Rahulshukla1259/jsonapi/data.json").then(res=>res.json()).then(data=>res.send(data))
})



