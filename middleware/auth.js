const {getUser}=require("../service/auth");

// 1) ye 2 functiion h jo hr cheez ko handle kr skte h Authentication and Authorization. 

// AUTHENTICATION:
function checkForAuthentication(req,res,next){
 const tokenCookie=req.cookies?.token;
 req.user=null;

 if(!tokenCookie) 
    // || !authorizationHeaderValue.startsWith("Bearer"))
    return next();
// const token=tokenCookie;
// authorizationHeaderValue.split("Bearer ")[1];
 const user =getUser(tokenCookie);
 if(!user)return next();
 req.user=user;
 return next();
}

// 2) for example admin normal:
function restrictTo(roles=[]){
    return function(req,res,next){
     if (!req.user) return res.redirect("/login");
        
       if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).send("Unauthorized");
}
     next();
    };
}

module.exports={
      checkForAuthentication,
     restrictTo,
}

                //OR

// async function restrictToLoggedinUserOnly(req,res,next){
//     // cookies:
//     // const userUid=req.cookies?.uid;

//     //token:
//      const userUid=req.headers("Authorization");

//      //both:
//     if(!userUid) return res.redirect("/Login");

//     //token:
//     const token=userUid.split("Bearer ")[1];
//     const user=getUser(token);

//     //cookies:
//     // const user=getUser(userUid);

//     if(!user) return res.redirect("/Login");

//     req.user = user;
//     next();
// }

// module.exports={
//     //cookies:
//     // restrictToLoggedinUserOnly,

// }