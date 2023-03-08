const express= require('express')
const app= express()
const port= 3000

app.get("/",(req,res)=>{
    res.send("wtf Deb??")
})
app.get("/ping",(req,res)=>{
    res.send("hello pong-deb")
})

app.listen(port,()=>{
    console.log(`APP listens---: ${port}`)
})