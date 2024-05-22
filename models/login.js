const mongoose=require("mongoose")


const userSchema =new mongoose.Schema({
    name: {
      type: String,
      
      requied: true,
    },
    email: {
      type: String,
     unique:true,
      requied: true,
    },
    password:{
        type:String,
        required:true
    }
  
  },{timestamps:true});
  
const User = mongoose.model("user", userSchema);

module.exports=User;