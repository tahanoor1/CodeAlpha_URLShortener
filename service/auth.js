///Statefull authentication:///

/// const sessionIdToUserMap=new Map();

// Stateless authentication://

const jwt=require("jsonwebtoken");
const secret="taha123@";
function setUser(user){
    /// sessionIdToUserMap.set(id,user)
    return jwt.sign( {
        _id:user._id,
        email:user.email,
        role:user.role,
    },
    secret,
    {
    expiresIn: "1d"
});
}

function getUser(token){
///   return sessionIdToUserMap.get(id);

if(!token) return null;
try{
return jwt.verify(token,secret);
} 
catch (error){
return null;
}

}

module.exports={
    setUser,
    getUser
}