const express = require("express")
const mysql =require("mysql")
const bodyparser=require("body-parser")
const res = require("express/lib/response")

const app = express()

const encoder = bodyparser.urlencoded()
app.use(bodyparser.json())

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"hotel"
})

con.connect(function(error){
    if(error)
    throw error;
    else{
        console.log("Database connected")
    }
})

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.get("/login",(req,res)=>{
    res.sendFile(__dirname+"/index1.html")
})

app.post("/",encoder,(req,res)=>{
    var name = req.body.t1;
    var mail=req.body.t2;
    var password = req.body.t3;
    var age = req.body.t4;
    var gender = req.body.t5;
    var p_no = req.body.t6;
    var address = req.body.t7;

    var sql = "INSERT INTO register (name,mail,password,age,gender,p_no,address) VALUES("+con.escape(name)+","+con.escape(mail)+","+con.escape(password)+","+con.escape(age)+","+con.escape(gender)+","+con.escape(p_no)+","+con.escape(address)+")"
    con.query(sql,function(error,result){
        if(error)
        throw error;
        res.redirect("/dis")
        console.log(result)
    
    })
})

app.get("/disp",(req,res)=>{
    var sql = "select * from register"
    con.query(sql,(error,result)=>{
        res.json(result)
    })
})


app.get('/dis',(req,res)=>{
    res.sendFile(__dirname+"/disp.html")
})






app.listen(4000,function(){
    console.log("Server Created")
    
})