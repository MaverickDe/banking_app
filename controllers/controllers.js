

const { spread, keys } = require("lodash")
const taskschema = require("../model/task")


const getAllTask = async (req,res)=>{
    try{
const alltask = await taskschema.find({})

res.json({alltask})
    }catch(err){res.status(500).json({err})}
    
}

const getTask= async (req,res)=>{
    
    try{

     const id=   await req.params.id
     console.log(id)
     const idobj=   await taskschema.findOne({_id:id})
     console.log(idobj,id)
     if(!idobj){
            res.status(404).json({msg:"does not exist"})
         return
        }
            res.json({idobj})

        

    }
    catch(err){
      res.status(500).json({err})
    }
    
}


const createTask = async (req,res)=>{
    try{

        
        
        
        //       const   babe = {loon:"happy",baby:"woo",goo:{lon:"sprad",job:"ho"}}
        // console.log(babe.goo.lon)
        const task = await taskschema.create(req.body)
         console.log(req.body,task)

         console.log({"Fsff":"Sds"})
        res.status(201).json({task})
    }catch(err){
      const  obj={}
        for (let keyss  in err.errors){
          const  error=err.errors[keyss].properties.message
           
            obj[keyss]=error
        }
        console.log(obj)
        const {name} = {name:err.errors.NAME.properties.message,}
console.log(name)
        res.status(550).json({obj})
    }
}

const updateTask=async (req,res)=>{
    
    try{
        const id = req.params.id
        const updatetsk = await taskschema.findOneAndUpdate({_id:id},req.body,{  new :true,runValidators:true})
        console.log(req.body)
        if(!updatetsk){
            res.status(404).json({msg:"does not exist"})
         return
        }
        res.json({updatetsk:"updated"})
    }catch(err){
        res.json({err})

    }
    
    
}



const deleteTask =async (req,res)=>{
    try{
        const id = req.params.id
        const deltask = await taskschema.findOneAndDelete({_id:id})
        if(!deltask){
            res.status(404).json({msg:"does not exist"})
         return
        }
        res.send("data deleted")


    }catch(err){res.json({err})}
    
    
}



module.exports={getAllTask,getTask,updateTask,createTask,deleteTask}