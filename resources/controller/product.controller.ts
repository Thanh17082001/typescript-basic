import { Request, Response } from "express";
import {
    find,
    create,
    findById,
    updateById,
    deleteById,
} from "../service/product.service";
import productDto from "../dto/product.dto";
import product from "../interface/product.interface";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import mongoose from "mongoose";
import * as xlsx from 'xlsx';

//[POST] '/product/create' create product
const createProduct = async (req: Request, res: Response) => {
    try {
        let data: productDto = req.body;
        data = plainToClass(productDto, req.body);
        const dataError = await validate(data);
        if (dataError.length > 0) {
            return res.status(404).json({ dataError });
        }
        await create(data);
        return res.status(200).send("Create is successfully");
    } catch (error) {
        res.status(500).send(error);
    }
};

//[GET] '/product?pageNumber=&pageSize=' get all product
const getAll = async (req: Request, res: Response) => {
    try {
        type data = {
            pageNumber: number;
            pageSize: number;
        };
        const pagination: data = {
            pageNumber: Number(req.query.pageNumber),
            pageSize: Number(req.query.pageSize),
        };
        const products: product[] = await find(
            {},
            pagination.pageNumber,
            pagination.pageSize
        );
        res.status(200).json(products);
    } catch (error: any) {
        res.status(500).json(error);
    }
};

//[PATCH] '/product/update?id=' update product
const updateProductById = async (req: Request, res: Response) => {
    try {
        const id: mongoose.Types.ObjectId = req.query.id as unknown as mongoose.Types.ObjectId;
        const productFind: product | null = await findById(id);

        // check product exist?
        if (!productFind) {
            return res.status(400).send("id does not exist!");
        }
        let data: product = req.body;

        // Determine if the data sent has been altered compared to the original data
        let check = false;
        for (let i = 0; i < Object.keys(data).length; i++) {
            for (let j = 0; j < Object.keys(productFind).length; j++) {
                if (
                    Object.keys(data)[i].toString() ==
                    Object.keys(productFind)[j].toString() &&
                    Object.values(data)[i] !== Object.values(productFind)[j]
                ) {
                    check = true;
                    break;
                }
            }
        }
        if (!check) {
            return res.status(400).send("The data has not been changed.");
        }

        const result = await updateById(id, data);
        return res.status(200).json({
            message: "Update product successfully !",
            newProduct: result,
        });
    } catch (error: any) {
        res.status(500).json(error);
    }
};

//[DELETE] '/product/delete?id=' delete product
const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id: mongoose.Types.ObjectId = req.query.id as unknown as mongoose.Types.ObjectId;

        const productFind: product | null = await findById(id);

        // check product exist?
        if (!productFind) {
            return res.status(400).send("id does not exist!");
        }
        await deleteById(id);
        return res.status(200).send("Product has been successfully deleted!");
    } catch (error: any) {
        res.status(500).json(error);
    }
};

//[GET] '/product/filter?' filters product
const filtersProduct = async (req: Request, res: Response) => {
    try {
        const filter = {
            ...req.query
        }
        type data = {
          pageNumber: number;
          pageSize: number;
        };
        const pagination: data = {
          pageNumber: Number(req.query.pageNumber),
          pageSize: Number(req.query.pageSize),
        };
        const result: product[] = await find(filter, pagination.pageNumber, pagination.pageSize)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error);  
    }
}

const readFile = async (req:Request, res:Response)=>{
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
          }
          const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
           // Lấy dữ liệu từ sheet đầu tiên
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data:Array<product> = xlsx.utils.sheet_to_json(sheet, {range:2});
        if(!!!data){
            return res.status(401).json({
                mes: "Account is not registered",
              });
        }
        let products: Array<product> = []
        const products2: product[] = await find();
        products=data.map((element) : product =>{
            return <product> {
                name:element.name,
                price:element.price,
                quantity:element.quantity,
                category:element.category
            }
        })
        
        await create(products);
        // Trả về dữ liệu đã đọc dưới dạng JSON
        return res.status(200).send("Import file is successfully");
        
    } catch (error) {
        res.status(500).json(error);  
        
    }
}

export {
  createProduct,
  getAll,
  updateProductById,
  deleteProduct,
  filtersProduct,
  readFile
};
