import mongoose, { Schema, type InferSchemaType } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength:2,
        maxlength:80,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        maxlenght:254
    },
    passwordHash: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        required: true,
    },
    avatharUrl: {
        type: String,
        default: null
    },
    avatharPublicId: {
        type: String,
        default: null
    },
},

{ timestamps: true, versionKey :false},)

export type UserDocument = InferSchemaType<typeof userSchema>

const User = mongoose.model("User",userSchema)

export default User