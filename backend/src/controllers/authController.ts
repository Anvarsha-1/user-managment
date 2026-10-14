import type {Request,Response} from "express";
import User from "../models/User.js";
import {comparePassword} from "../utils/passoword.js";
import {loginSchema} from "../validators/authValidator.js";
import { generateAccessToken } from "../utils/token.js"


export const login =async (req:Request,res:Response):Promise<void>=>{
    const result = loginSchema.safeParse(req.body)

    if(!result.success){
        res.status(400).json({
            message:"Invalid login input",
            errors:result.error.flatten().fieldErrors,
        });
        return;
    }

    const {email,password} = result.data
  try{
      const user = await User.findOne({ email }).select('+passwordHash')

      if (!user || await comparePassword(password,user?.passwordHash)){
        res.status(401).json({
            message:"Invalid email or password",
        })
        return;
      }

      const accessToken = generateAccessToken({
        userId:user._id.toString(),
        role:user.role
      })

      res.status(200).json({
        message:"Login Success",
        accessToken,
        user:{
            id: user._id.toString(),
            name:user.name,
            email:user.email,
            role:user.role,
            avatharUrl:user.avatharUrl
        }
      })
  }catch(error){
    console.log("Login failed",error)
    res.status(500).json({
        message:"internal server error"
    })
  }

}
