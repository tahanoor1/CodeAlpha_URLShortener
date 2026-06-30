const{v4: uuidv4}=require("uuid")
const User=require("../models/user");
const {setUser}= require("../service/auth")

async function handleUserSignup (req, res){
const {name,email,password,jobTitle,gender}=req.body

await User.create({
    name,
    email,
    password,
    jobTitle,
    gender,
});

return res.redirect("/");
    
}

async function handleUserLogin (req, res){
const {email,password}=req.body

const user=await User.findOne({email,password});
if(!user) return res.render("Login",{
    err :"Invalid Username or Password",
});

// const sessionId=uuidv4();
const token=setUser( user);
res.cookie("token", token, {
    httpOnly: true
});
return res.redirect("/");
}


module.exports={
    handleUserSignup,
    handleUserLogin,
}