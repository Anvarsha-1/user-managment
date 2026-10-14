import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../config/db.js"
import User from "../models/User.js"
import { hashPassword } from "../utils/passoword.js"


const seedAdmin = async (): Promise<void> => {
    const name = process.env.ADMIN_NAME
    const email = process.env.ADMIN_EMAIL
    const password = process.env.ADMIN_PASSWORD

    if (!name || !email || !password) {
        throw new Error("ADMIN_NAME,ADMIN_EMAIL,ADMIN_PASSWORD must be in .env")
    }
    if (password.trim().length < 12) {
        throw new Error("ADMIN_PASSWORD must be at least 12 characters long")
    }

    await connectDB()

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
        if (existingAdmin.role !== "admin") {
            throw new Error("This email is existing to a non-admin user. choose another ADMIN_EMAIL")
        }
        console.log("An admin with this email already exist. No changes made")
        return
    }

    const passwordHash =  await hashPassword(password)

    await User.create({
        name,
        email,
        passwordHash,
        role:"admin"
    })
    
    console.log(`Admin account create for ${email}`)
}

 seedAdmin()
 .catch((err:unknown)=>{
     console.log("Admin Seed Failed:",err)
     process.exitCode = 1;
 })
 .finally(async()=>{
   await mongoose.disconnect();
 })