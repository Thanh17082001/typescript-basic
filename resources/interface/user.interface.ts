import { Document } from "mongoose";

interface user extends Document {
    fullName?: String,
    email?: String,
    passWord?: String,
    roles?:Array<String>,
}

export default user;
