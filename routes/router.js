const express=require("express")
const {handleGenerateNewFastUrl, handleshorturl,handleurlanalytics}=require("../controllers/url")
const router=express.Router();
const URL=require("../models/url")
router.post("/",handleGenerateNewFastUrl)
router.get("/analytics/:shortid",handleurlanalytics);
module.exports=router;