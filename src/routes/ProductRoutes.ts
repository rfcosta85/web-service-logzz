import * as express from "express";
import { ProductController } from "../controllers/ProductController";

const router = express.Router();
const productController = new ProductController();

router.route(`/:id`)
    .get(productController.buy.bind(productController))
    .delete(productController.delete.bind(productController))
    .patch(productController.parcialUpdate.bind(productController)) 
    .put(productController.update.bind(productController)) 

router.route('/')
    .get(productController.list.bind(productController))
    .post(productController.create.bind(productController))

export default router;