const shortid =require("shortid");
const URL=require("../models/url");

async function handleGenerateNewShortURL(req,res){
    console.log("BODY:", req.body);
    console.log("USER:", req.user);
    const {url}= req.body|| {};
    
    if(!req.body.url) return res.status(400).json({error:"url is required"});
    const shortID=shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: url,
        visitHistory:[],
         createdBy: req.user._id

    });
    return res.render("home",{
        urls: await URL.find({ createdBy: req.user._id })
    })
    
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const  result=await URL.findOne({shortId});
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory,
    });
}



module.exports={
    handleGenerateNewShortURL,
       handleGetAnalytics,
    
};