const express=require("express")
const {handleuserSignup, handleuserSignin}=require("../controllers/user")
const router=express.Router();
router.post("/",handleuserSignup);
router.post("/login",handleuserSignin);
module.exports=router;