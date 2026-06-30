const express=require("express");
const { checkForAuthentication } = require("../middleware/auth");

const {handleGenerateNewShortURL,
       handleGetAnalytics
}=require("../controllers/url");

const router=express.Router();

router.post("/", checkForAuthentication,handleGenerateNewShortURL);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports= router; 