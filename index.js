const express=require("express");
const path=require("path");
const cookieParser=require("cookie-parser");

const {connectToMongoDB}=require("./connect");
// const {restrictToLoggedinUserOnly}=require("./middleware/auth");
const { checkForAuthentication,restrictTo}=require("./middleware/auth");

const URL=require("./models/url");

const urlRoute=require("./routes/url");
const staticRoute=require("./routes/staticRouter");
const userRoute=require("./routes/user")

const app=express();
const PORT=8001;
 
// connect mongoDB:
connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=>console.log("Mongodb Connected"));

// Set the view engine:
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//Middleware:
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(checkForAuthentication);

//URL redirect route (protected properly):


app.get("/url/:shortId", checkForAuthentication,async(req,res)=>{
    const shortId=req.params.shortId;
   const entry= await URL.findOneAndUpdate({
        shortId,
    },
    {
     $push:{
        visitHistory: {timestamp: Date.now()},  
    
    },
    
}

);
  return res.redirect(entry.redirectURL);
});





// AUTH middleware (must be before routes):





// // use res.render to load up an ejs view file
// app.get("/test",  async(req, res) => {
//     const allUrls = await URL.find({});
//  return res.render("home",{
//   urls: allUrls
//  });
      
// });

// Routes:
// app.use("/url",restrictToLoggedinUserOnly,urlRoute);
app.use("/url",restrictTo(["NORMAL"]),urlRoute);
app.use("/user",userRoute);
app.use("/",staticRoute);

//Server Start:

app.listen(PORT,()=>console.log(`Server Started at PORT:${PORT}`))