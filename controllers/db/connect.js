const mongoose = require("mongoose")




const connection=`mongodb+srv://princedatabase:mongodbdata@nodeexpressproject.m5juc.mongodb.net/taskmanager?retryWrites=true&w=majority`


const connectdb=(url)=>{
mongoose.connect(connection, 
//     {
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useFindAndModify:false,
//     useUnifiedTopology:true

// }
 ).then(console.log("connected")).catch(err=>{console.log(err)})

}
module.exports = {connectdb}