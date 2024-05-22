const shortid = require('shortid36');

const URL=require("../models/url")
async function handleGenerateNewFastUrl(req,res){
    const body=req.body;
    const allurls=await URL.find({})
    
    if(!body.url){return res.status(400).json({message:"url not found 1"})
    }
 const result=await URL.create({
    shortid:shortid.generate(),
    redirecturl:body.url,
    visithistory:[],
    createdBy:req.user._id
})

return res.render("home",{id:result.shortid})
}

async function handleurlanalytics(req, res) {
    const shortid = req.params.shortid;
    
    const entry = await URL.findOne(
        { shortid }
    );
    if (!entry) {
        return res.status(404).json({ error: "URL not found 2" });
        
    }
    
    return res.status(200).json({clicks:entry.visithistory.length, analytics:entry.visithistory})
}
async function handleshorturl(req, res) {
    const shortid = req.params.shortid;
    
    const entry = await URL.findOneAndUpdate(
        { shortid },
        {
            $push: {
                visithistory: {
                    timestamp: Date.now()
                }
            }
        },
        { new: true }
    );
    if (!entry) {
        return res.status(404).json({ error: "URL not found 3" });
    }
    
    res.redirect(entry.redirecturl);
}
module.exports={handleGenerateNewFastUrl,handleshorturl,handleurlanalytics}
