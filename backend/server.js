const express=require('express');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const mysql=require('mysql');
const bcrypt=require('bcrypt');
const cookieParser=require('cookie-parser');
const port=5000;
const salt=10;

const app=express();
app.use(express.json());
app.use(cors({
  origin:["http://localhost:5175"],
  methods:["POST","GET"],
  credentials: true
}));
app.use(cookieParser());

//creating connection to the database
const db=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"signup"
})

//middleware
const verifyUser=(req,res,next)=>{
  const token=req.cookies.token;
  if(!token){
    return res.json({Error:'You are not authenticated'})
  }else{
    jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
      if(err){
        return res.json({Error:'Invalid user token'})
      }else{
        req.name=decoded.name
        next();
      }
    })
  }
}

//routes
app.get('/',verifyUser,(req,res)=>{
  return res.json({Status:"success",name:req.name});
})
//register routes
app.post('/register',(req,res)=>{
  const sql='INSERT INTO login(`name`,`email`,`password`) VALUES(?)';
  bcrypt.hash(req.body.password.toString(),salt,(err,hash)=>{
    if(err){
      return res.json({Error:'There was an error in password hash'})
    };
    const values=[
      req.body.name,
      req.body.email,
      hash
    ]

    db.query(sql,[values],(err,result)=>{
      if(err)return res.json({Error:err});
      return res.json({success:'success'})
    })
  })
 
})
//login route
app.post('/login',(req,res)=>{
  const userEmail=[
    req.body.email,
  ]
  const sql='SELECT * FROM login WHERE email=?';
  db.query(sql,userEmail,(err,result)=>{
    if(err)return res.json(err);
    if(result.length>0){
      bcrypt.compare(req.body.password.toString(),result[0].password,(err,data)=>{
        if(err) return res.json({Error:err});
        if(data){
          //generating tokken
          const name=result[0].name;
          const token=jwt.sign({name},'jwt-secret-key',{expiresIn:'1d'});
          res.cookie('token',token);
          return res.json({Status:"success"});
        }else{
          return res.json({Error:"Invalid Credentials"});
        }
       
      })
    }else{
      return res.json({Error:"User doesn't exist"})
    }
  })

})
app.listen(port,()=>{
  console.log(`Server started on port ${port}`);
})


