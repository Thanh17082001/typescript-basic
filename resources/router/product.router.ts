import { createProduct, getAll, updateProductById, deleteProduct, filtersProduct,readFile } from "../controller/product.controller";
import upload from "../untils/multer";
import express,{Router} from 'express'

const router: Router = express.Router()

router.post('/upload',upload().single('excel-file'),readFile)
router.post('/create', createProduct)
router.patch('/update', updateProductById)
router.delete("/delete", deleteProduct);
router.get("/filter", filtersProduct);
router.get("/", getAll);

export default router;