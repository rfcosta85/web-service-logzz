import { Request, Response } from "express";
import { ProductRepository } from "../repository/ProductRepository";
import { ProductView } from "../views/ProductView";
import { Product } from "models/ProductModel";

export class ProductController {
    private repository: ProductRepository;
    private productView: ProductView;

    constructor() {
        this.repository = new ProductRepository();
        this.productView = new ProductView({} as Product);
    }

    // mudar para Buy
    // list
    // create
    // delete
    // update
    public getProduct(req: Request, res: Response): void {
        // O retorno pode ser void pq no express eles não precisam retornar um valor, pois a resposta é tratada  diretamente pela função através de res.send()
        //  ou métodos semelhantes.
        const id = req.params.id;
        if (!id) {
            res.status(400).send('Malformatted url')
            return; // pesquisar se precisa do return >>> Sem o return o código irá entrar no try catch (segundo o estúpido)
        }
        try {
            console.log("Eu não deveria surgir!")
            const product = this.repository.getProductById(id);

            if (!product) {
                res.status(404).send("Product not found");
                return;
            }
            this.productView.setProduct(product);
            const html = this.productView.render();
            res.send(html);
        } catch (error) {
            res.status(500).send("Internal Server Error");
        }
    }
}
