import bcrypt from "bcrypt"

const SALT_ROUND = 12;


export const hashPassword =  async(password:string):Promise<string>=>{
    return bcrypt.hash(password,SALT_ROUND)
}


export const comparePassword = async(password:string,hashPassword:string):Promise<boolean>=>{
    return bcrypt.compare(password,hashPassword)
}




