
import { productModel } from "../model/product.model";
import product from "../interface/product.interface";
import mongoose from "mongoose";



const create = async (data: any) => {
    return await productModel.create(data)
}


const find = async (condition: object = {}, pageNumber: number =0 , pageSize: number =0, sort: {
    [field: string]: 1 | -1
} = { createdAt: -1 }): Promise<product[]> => {
    if (pageNumber!=0 && pageSize!=0) {
        const skip = (Number(pageNumber) - 1) * Number(pageSize);
        return await productModel
          .find(condition)
          .sort(sort)
          .skip(skip)
          .limit(pageSize)
          .lean();
    }
    return await productModel.find().lean()
}

const findOne = async (condition: object = {}): Promise<product | null> => {
    return await productModel.findOne(condition).lean();
}

const findById = async (id: mongoose.Types.ObjectId): Promise<product | null> => {
    return await productModel.findById(id).lean();
}

const updateById = async (id: mongoose.Types.ObjectId, data: product): Promise<product | null> => {
    return await productModel.findByIdAndUpdate(
        id,
        { $set: data },
        {
            returnDocument: 'after',
            new:true
        }
    ).lean()
}

const deleteById = async (id: mongoose.Types.ObjectId) => {
    return await productModel.findByIdAndDelete(id)
}


export { find, create, findOne, findById, updateById, deleteById }