const express= require("express");
const path= require("path");
const {connectMongoDb}= require("./connect");
const eventRoute= require("./routes/event");
const registrationRoute = require("./routes/registration");

const app= express();
const PORT= 8000;

// MongoDb Connection:
connectMongoDb("mongodb://localhost:27017/Event_Registration")
.then(()=> console.log("MongoDb Connected"))
.catch((err)=> console.log(err));

app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/events", (req, res, next) => {
  console.log("Events Route Hit");
  next();
});

app.use("/events", eventRoute);
app.use("/registrations", registrationRoute);

app.get("/", (req,res)=>{
    res.send("Event Registration is Running....");
});


app.listen(PORT, ()=>{
    console.log(`server started at PORT ${PORT}`);
});