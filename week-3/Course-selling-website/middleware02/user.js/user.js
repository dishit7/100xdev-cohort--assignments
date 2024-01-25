const jwt=require("jsonwebtoken")

const JWT_SECRET="1234"

function UserAuthorization(req,res,next){
    try{
    const token=req.headers.authorization
    const decodedValue= jwt.verify(token,JWT_SECRET)
    if(decodedValue){
        next() 
    }
    else{
        res.status(411).json({
            msg:"You are not authenticated"
        })
    }
    }
    catch(err){
       console.log(err)
       res.status(401).send("Unauthorized");

    }
}

module.exports=UserAuthorization