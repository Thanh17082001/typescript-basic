import mongoose, { Schema, Document, Model } from "mongoose";
import product from "../interface/product.interface";


// declare productSchema with interface product
const productSchema  = new Schema<product>({
    name: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    category: {
        type: String,
        required:true
    },
    quantity: {
        type: Number,
        required:true
    }
}, {timestamps:true})

export const productModel = mongoose.model('product',productSchema)
