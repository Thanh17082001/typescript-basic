import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


function authenToken(req: Request, res: Response, next: NextFunction) {
    const token: string | undefined = req
        .header("Authorization")
        ?.replace("Bearer ", "");
    if (!token) return res.status(401).json('Token is not empty');
    jwt.verify(token, 'nguyenthienthanh', (err, data) => {
        if (err) {
            return res.status(403).json(err)
        }
        else {
            return next();
        }
    });
}

export default authenToken;
