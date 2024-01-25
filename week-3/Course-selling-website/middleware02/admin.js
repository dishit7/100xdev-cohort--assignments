const jwt=require("jsonwebtoken")

const JWT_SECRET="1234"


function adminAuthorization(req,res,next){
    //jwt.verify
    const token=req.headers.authorization
    const words= token.split(" ")
    const jwtToken=words[1]
        try{
            const decodedValue=jwt.verify(jwtToken,JWT_SECRET)
            if(decodedValue.username){
                next()
            }
            else{
                res.status(411).json({
                   msg:"You are not authenticated"
                }
                )
            }
        }
        catch(err){
            console.log(err)
            res.send( "INVALID INPUT" )

        }
}

module.exports=adminAuthorization