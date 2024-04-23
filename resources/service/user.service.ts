
import { userModel } from "../model/user.model";
import user from "../interface/user.interface";
import mongoose from "mongoose";



const create = async (data: any) => {
  return await userModel.create(data);
};


const find = async (condition: object = {}, pageNumber: number = 1, pageSize: number = 6, sort: {
    [field: string]: 1 | -1
} = { createdAt: -1 }): Promise<user[]> => {
    const skip = (Number(pageNumber) - 1) * Number(pageSize);
    return await userModel
      .find(condition)
      .sort(sort)
      .skip(skip)
      .limit(pageSize)
      .lean();
}

const findOne = async (condition: object = {}): Promise<user |null> => {
    return await userModel.findOne(condition).lean();
}

const findById = async (id: mongoose.Types.ObjectId): Promise<user | null> => {
    return await userModel.findById(id).lean();
}

const updateById = async (id: mongoose.Types.ObjectId, data: user): Promise<user | null> => {
    return await userModel.findByIdAndUpdate(
        id,
        { $set: data },
        {
            returnDocument: 'after',
            new:true
        }
    ).lean()
}

const deleteById = async (id: mongoose.Types.ObjectId) => {
    return await userModel.findByIdAndDelete(id)
}


export { find, create, findOne, findById, updateById, deleteById }