import express from "express";
import { ProductController } from "../controllers/ProductController";

const router = express.Router();
const productController = new ProductController();

router.route(`/:id`)
    .get(productController.getProduct.bind(productController))
    .delete((req, res) => {})
    .patch((req, res) => {}) // É utilizado para aplicação alterações parciais em um recurso
    .put((req, res) => {}) // Substitui todas as atuais representações do recurso de destino pela carga de dados da requisição.

router.route('/')
    .get((req, res) => {res.status(200).send([])})
    .post((req, res) => {res.status(201).send()})
    .options((req, res) => {}) // Tem necessidade? 

export default router;
