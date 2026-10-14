import jwt from "jsonwebtoken";


const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET

if (!JWT_ACCESS_SECRET){
    throw new Error("JWT_ACCESS_SECRET is not defined in enviornment variable")
}

export interface AccessTokenPayload{
    userId:string,
    role:"user"|"admin"
}

export const generateAccessToken = (payload:AccessTokenPayload,):string=>{
       return jwt.sign(payload,JWT_ACCESS_SECRET,{
        expiresIn:"15m",
       })
}