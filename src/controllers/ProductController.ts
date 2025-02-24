import { Request, Response } from "express";
import { ProductRepository } from "../repository/product/ProductRepository";
import { ProductView } from "../views/ProductView";
import { Product } from "../models/ProductModel";

export class ProductController {
    private repository: ProductRepository;

    constructor() {
        this.repository = new ProductRepository();
    }


    public async buy(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        if (!id) {
            res.status(400).send('Bad request: Malformatted url')
            return;
        }
        try {
            const product = await this.repository.find(id);

            if (!product) {
                res.status(404).send("Product not found");
                return;
            }
            const html = ProductView.render("product-redirect", product);
            res.status(301).send(html);
        } catch (error) {
            res.status(500).send("Internal Server Error");
        }
    }

    public async list(req: Request, res: Response): Promise<void> {
        const list = this.repository.list()
        const productListHtml = ProductView.render("products-list", list)
            
        try {
            if (!list) {
                res.status(404).send('List not found');
                return;
            }
    
            res.status(200).send(productListHtml)
        } catch (error) {
            res.status(500).send("Internal Server Error");

        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        const productData: Omit<Product, "id"> = req.body;

        try {
            const newProduct = await this.repository.save(productData as Product);

            if (!newProduct) {
                res.status(500).send("Failed to create product");
                return ;
            }

            res.status(201).send(newProduct)
        } catch (error) {
            console.error(error);
            res.status(500).send("Iternal Server Error");
        }
    }    
    
    public async delete(req: Request, res: Response): Promise<void> {
        const id = req.params.id;

        if (!id) {
            res.status(400).send('Malformatted url');
            return;
        }

        try {
            const deleted = await this.repository.delete(id);

            if (deleted) {
                res.status(204).send()
            } else {
                res.status(404).send('Product not found')
            }
        } catch (error) {
            res.status(500).send('Internal Server Error')
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const updateProduct: Product = req.body;

        try {
            const product = await this.repository.update(id, updateProduct);

            if (!product) {
                res.status(404).send('Product not found');
                return;
            }

            res.status(204).send(product);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

    public async parcialUpdate(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const patchProdcut: Partial<Product> = req.body;
        const product = this.repository.partialUpdate(id, patchProdcut);

        try {
            if(!product) {
                res.status(404).send('Product not found');
                return;
            }
    
            res.status(204).send(product);

        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }

    }
}
