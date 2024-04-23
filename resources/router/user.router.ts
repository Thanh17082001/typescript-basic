import {Router,Express} from 'express'
import userController from '../controller/user.controller';
import authenToken from '../middleware/auth';
const router: Router = Router();

router.post("/login", userController.logIn);
router.post("/register", userController.register);
router.get("/getAll",authenToken, userController.getAll);

export default router;