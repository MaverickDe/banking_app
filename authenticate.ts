let user = [
  {password:"hello",
email:"2222@gmail.com"}

]

const key = "12uioendcydyoydwa8yowyeb8ayxa9283928332unpxxuxex8wud";
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const _conection1 = require("./createccount").bb
const _conection2 =require("./createccount").transb


function register(req:any,res:any,next:any){
    bod1 = req.body
   jwt.sign(req.body,key)

}

const _authuser = require("./createccount").authuser;

function reguser(req:any,res:any,next:any){
    _authuser(req,res,next)
   let bod1 = req.body
//    console.log(bod1)
   let user1 = user.find(e=>{
      
    })

}


function authenticate(req:any,res:any,next:any){
    console.log(req.cookies,"Dd")
    if(req.signedCookies.oblivion){
        let _cookie =req.signedCookies.oblivion
        console.log(_cookie)
        jwt.verify(_cookie,key,(err:any,data:any)=>{
            let __data =data
            if(err){
                res.status(404).send(err)
                return
            }
            console.log("data,",data)
            // req.loggedin=data
            _conection2.findOne({email:data.email},(err:any,data:any)=>{
                if(err){
                    res.status(404).send("Err")
                    return

                }

                if(data!=null){

                    req.transactions = data.transaction
                    req.account_balance = data.account
                    req.acctarr=data.acctarr
                    console.log(req.acctarr)
                }
                else{
                    req.transactions = null
                    req.account_balance = null

                }

                _conection1.findOne({email:__data.email},(err:any,data:any)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        data.password=""
                        console.log(data,"data----")
                        req.loggedin=data
                        next()
                    }

                })
            })
            console.log(req.cookies)
            console.log(data)

        })
        // jwt.verify()
    }
    else{
        console.log(req.signedCookies.oblivion)
        res.redirect("/login")
    }

}


function transaction(req:any,res:any){
    let _cookie =req.signedCookies.oblivion
    console.log(_cookie)
    jwt.verify(_cookie,key,(err:any,data:any)=>{
        if(err){
            res.status(404).send(err)
            return
        }
    
   let  email=data.email
   _conection2.findOne({email:email},(err:any,data:any)=>{
       console.log(data.transaction)
       res.json(data.transaction)

   })
    
    })
    

}

module.exports={reguser,authenticate,transaction}