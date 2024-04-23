import jwt from "jsonwebtoken";

import{Request, Response} from 'express'
import userDTO from "../dto/user.dto";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import * as userService from "../service/user.service"
import argon2 from "argon2"
import userInterface from "../interface/user.interface";


class UserController {
  async logIn(req: Request, res: Response) {
    try {
      let user: userDTO = plainToClass(userDTO, req.body);
      const dataError = await validate(user);
      if (dataError.length > 0) {
        return res.status(400).json({
          error: dataError,
          mes: "Data can not empty !!!",
        });
        }
        const userExist :userInterface | null  = await userService.findOne({email:user.email})
        if(!!!userExist){
          return res.status(401).json({
            mes: "Account is not registered",
          }); 
        }
        const pass:string = userExist?.passWord ? userExist?.passWord.toString() : ''
          const passWordVerify :boolean = await  argon2.verify(pass,user.passWord)
        if(passWordVerify){
          const token = jwt.sign({...user}, "nguyenthienthanh", {
            expiresIn: "3m"
          });
          return res.status(200).json({
              token,
              user:userExist
          });
        }
        return  res.status(401).json({
         mes:'incorrect password'
      });
    } catch (error) {
        console.log(error);
      res.status(500).json(error);
    }
  }

  async register(req:Request, res:Response){
    try {
      let user: userDTO = plainToClass(userDTO, req.body);
      const dataError = await validate(user);
      if (dataError.length > 0) {
        return res.status(400).json({
          error: dataError,
          mes: "Data can not empty !!!",
        });
        }
        const userExist :userInterface | null  = await userService.findOne({email:user.email})
        if(!!userExist){
          return res.status(400).json({
            mes: "email is already exists!",
          });
        }
        user.passWord = await argon2.hash(user.passWord);
        await userService.create(user);

      res.status(200).json({
        mes:"Create is successfully!!!"
      })
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

    async getAll(req: Request, res: Response) {
        try {
        return res.status(200).json({mes: 'Thành công'})
      } catch (error) {
          console.log(error);
         res.status(500).json(error);
      }
  }
}

export default new UserController()