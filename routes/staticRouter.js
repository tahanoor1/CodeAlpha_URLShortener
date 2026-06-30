const express=require("express");
const {restrictTo,checkForAuthentication}=require("../middleware/auth")
const URL = require("../models/url");

const router=express.Router();


router.get("/admin/urls",restrictTo(["ADMIN"]), async(req,res)=>{
    const allurls=await URL.find({});
    return res.render("home",{
        urls:allurls,
    });
});

// router.get("/",restrictTo(["NORMAL"]), async(req,res)=>{
//     const allurls=await URL.find({createdBy:req.user?._id});
//     return res.render("home",{
//         urls:allurls,
//     });
// });



router.get("/", checkForAuthentication, async (req,res)=>{
    const allurls=await URL.find({createdBy:req.user?._id});
     
    return res.render("home",{
        urls:allurls,
    });
});

router.get("/Signup",(req,res)=>{
    return res.render("Signup");
});

router.get("/Login",(req,res)=>{
    return res.render("Login");
});

router.get("/:shortId", async (req, res) => {
    const entry = await URL.findOne({
        shortId: req.params.shortId,
    });

    if (!entry) return res.send("URL not found");

    return res.redirect(entry.redirectURL);
});


module.exports= router; 