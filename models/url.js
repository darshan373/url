const mongoose=require("mongoose")


const urlSchema =new mongoose.Schema({
    shortid: {
      type: String,
      unique: true,
      requied: true,
    },
    redirecturl: {
      type: String,
     
      requied: true,
    },
    visithistory:[{timestamp:{type:Number}}], createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },{timestamps:true});
  
const URL = mongoose.model("url", urlSchema);

module.exports=URL;