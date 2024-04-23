import express, {Express, Request, Response} from 'express';
import productRouter from './product.router'
import userRouter from "./user.router";
const router = (app: Express) => {
    app.use('/product', productRouter)
    app.use("/user", userRouter);
    app.use('/', (req: Request, res: Response)=>{
        res.send('<h3>Trang chủ</h3>')
    })
}

export default router;

