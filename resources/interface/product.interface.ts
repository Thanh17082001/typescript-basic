import { Document } from "mongoose"

interface product extends Document{
    name: string,
    price: number,
    category: string,
    quantity: number,
}

export default product