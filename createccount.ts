import bodyParser from "body-parser"

const Schema =require("./schema")
const fs = require("fs")
const mongoose = require("mongoose")
// const _conectdb = require("./connect");
let bb:any;
let bbl:any;
let transb:any;
function conection1(){


const connection2=`mongodb+srv://prince1:123prince1@cluster0.4vxre.mongodb.net/account?retryWrites=true&w=majority`
const connection3=`mongodb+srv://prince1:123prince1@cluster0.4vxre.mongodb.net/transactions?retryWrites=true&w=majority`


const _conectdb = mongoose.createConnection(connection2, 
    {
    useNewUrlParser:true,
   
  

})

const _trans = mongoose.createConnection(connection3, 
    {
    useNewUrlParser:true,
   
  

})


 bbl = _conectdb.model("imageval",new mongoose.Schema({}, { strict: false }))

 bb =  _conectdb.model("task",new mongoose.Schema({
    firstname:{
        type:String,
    
       
    },
    email:{
        type:String,
    
       
    },
    middlename:{
        type:String,
     
      
    },
    lastname:{
        type:String,

    },
    dateofbirth:{
        type:String,
     
    },
    gender:{
        type:String,
     
     
    },
    phone_number1:{
        type:String,
     
       
    },
    phone_number2:{
        type:String,
     
   
    },
    permanent_adress:{
        type:String,
     
       
    },
    Temporary_adress:{
        type:String,
     
   
    },
    country:{
        type:String,
     
      
    },
    LGA:{
        type:String,
     
      
    },
    id:{
        type:String,
     
       
    },
   
    password:{
        // type:String,
     
        // maxlength:[20,"name cannot be more than characters"]
    },

   
})) 
 transb =  _trans.model("task",new mongoose.Schema({
    transaction:{
        type:Array,
    
       
    },
    account:{
        type:String,
     
       
    },
    email:{
        type:String,
     
       
    },
    acctarr:{
        type:Array
    }
  
   
})) 
}

conection1()
async function create(req:any,res:any){
    console.log(req.files)
    bb.findOne({email:req.body.email},  (err:any, docs:any)=> {
        if(err){
            res.render("regform.ejs",{err:err.message})
            return
        }
        if(!docs){

            
            let file = req.body.email
            req.body.account_number=req.body.phone_number1
            var bb2 =  bbl.create({file:req.files})
        
            var bb1 =  bb.create(req.body)
            req.body.password=""
            let token =jwt.sign(req.body,key)
            res.cookie("oblivion", token,{
                maxAge:900000,
                httpOnly:true,
                signed:true
            })
            
                res.redirect("/")
                return
        }
        if(docs){
            res.render("regform.ejs",{err:"user already exist",loggedin:false})
            Object.values(req.files).forEach(e=>{
                console.log((e[0].id).toString(),"llll")

                deletaimages((e[0].id).toString())
            })
        }

    })
    // console.log(Schema)
    //  console.log(mongoose.connection)
    // fs.readFile(req.files.IDfile ,"binary",(err,data)=>{
    //     if(err){console.log(err)
    //     if(data){console.log(data)}}
    // })

//   let  bb = await new Schema.create({
//         "firstname":req.body.firstname,
//         "middlename":req.body.middlename
//     })

    // bb.save()

//   var b =  new FileReader()
//   b.onload=()=>{console.log(b.result)}
//   b.readAsBinaryString(req.files.IDfile)

}

const jwt = require("jsonwebtoken");
const _chunk = require("./server").chunk;
const _file = require("./server").file;
const key = "12uioendcydyoydwa8yowyeb8ayxa9283928332unpxxuxex8wud";

function deletaimages(id__:any){
  

console.log(id__)

_file.findOneAndDelete({_id:id__}, function (err:any, docs:any) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted User : ", docs,"gygy");
    }
});
_chunk.find({}, function (err:any, docs:any) {
    // console.log(docs)
    if (err){
        console.log(err)
    }
    if(docs){
        console.log("uksygesyugkdsyugsyudg")
        if(docs!=null){
            docs.forEach((e:any)=>{
                // console.log(e.files_id=="62806e101a4e089150520cb5")
                if(e.files_id == id__){
                     _chunk.findOneAndDelete({_id:e._id}, function (err:any, docs:any) {
                        if (err){
                            console.log(err)
                        }
                        else{
                        if(docs!=null){
                             
                                    console.log("Deleted User : ", docs._id);
                                }else{
                            console.log("Deleted User : ", docs);

                        }
                        }
                    });

                }
            })
            
        }
        // console.log("Deleted User : ", docs);
    }
});

}


  function authuser(req:any,res:any,next:any){
        console.log("kkkkkkkk")
     
       let bod1;
 bb.findOne({email:req.body.email},  (err:any, docs:any)=> {
           if(err){console.log(err)}
           if(docs !=null){console.log(docs,"docs"),bod1 = docs
           if(
            req.body.password==bod1.password   ){
                req.body.password=""
     
                let token =jwt.sign(req.body,key)
                res.cookie("oblivion", token,{
                    maxAge:900000,
                    httpOnly:true,
                    signed:true
                })
                next()
            }else{
                res.status(404).send("not found")
            }
        
       }
       })
      
   
      
   
   }




   function withdrawandfund(req:any,res:any,next:any){
       req.body.invoice = Math.random().toString().slice(2,-1)
       console.log(req.url)

       req.body.date= `${new Date().getUTCDate()}/ ${new Date().getMonth()} /${new Date().getFullYear()}  ||  ${new Date().getHours() }:${new Date().getSeconds()} `

    if(req.url=="/fund-account_"){
        req.body.description = "CREDIT:  "+ req.body.description
        req.body.tax="1.20"
    }
    
    if(req.url=="/withdraw_"){
        req.body.description = "DEBIT:  "+ req.body.description
        req.body.tax="3.20"

    }


    let _cookie =req.signedCookies.oblivion
    console.log(_cookie)
    jwt.verify(_cookie,key,(err:any,data:any)=>{
        if(err){
            res.status(404).send(err)
            return
        }

        
        console.log(req.cookies)
        console.log(data)
        let cookiedata = data

        let user = data.email
        transb.findOne({email:user},(err:any,data:any)=>{

            let transbdata = data
            if(err){
                res.status(404).send(err)
                return
            }

            let _data;
            let _account;
            let _transaction
            let _err ="sucess"


            if(data!=null){
                let   id=data._id.toString()
                
                _data =req.body
                if(req.url=="/withdraw_" ){
                    
                    if(+data.account > +req.body.amount){
                        req.body.balance = +data.account  -   +req.body.amount
                      
                    }
                    else{
                        _err = "amount is small"
                    }
                    
                }
                
                else{
                    req.body.balance = +data.account  +   +req.body.amount
                    
                }
                _account = req.body.balance
            
                // console.log(data.acctarr,data.acctarr.push(req.body.balance))
            //   data.acctarr.push(req.body.balance)
              req.acctarr = data.acctarr
              console.log("req.body",req.acctarr)
              
              
              console.log(data.transaction,"transaction")
              data.transaction.push(req.body);
              _data = data.transaction
              console.log(_account,"_account",id)
              if(_err!= "amount is small"){
          data.acctarr.push(req.body.balance)
          req.acctarr = data.acctarr

        transb.findOneAndUpdate({_id:id},{
            account:_account,transaction:_data ,acctarr:req.acctarr
            
        },(err:any)=>{
            if(err){
                console.log(err)
    
            }
           console.log("suucess")
        })
    }
}
else{
    if(req.url=="/withdraw_"){
        res.send("account balance = 0")
        return
    }
    req.body.balance = req.body.amount
    _account = req.body.amount
    _data=[req.body]
    req.acctarr = [_account]
    
    let tt   = []
        tt.push(req.body)
    transb.create({
        
        email:user,transaction:tt, account:_account,acctarr:req.acctarr
    })


}

req.loggedin= cookiedata
req.transactions=_data
req.account_balance = _account
req.err=_err

if(_err=="amount is small"){
req.transactions=transbdata.transaction

}
console.log(req.acctarr,"Cslhguhduhbdhlsjd",cookiedata)

next()
                    // bb.findOne({email:user},(err,data)=>{
                    //  if(err){
                    //      res.status(404).send(err)
                    //      return
                    //  }

                    // })
        })
        // res.send("hello")
        // next()
        

    })


    
   }

 

module.exports = {withdrawandfund,create,authuser,bb
    , transb}