import { Product } from "../models/ProductModel";
// Pesquisar se podemos criar uma pasta de html p substituir o return do render
export class ProductView {
    private product: Product;

    constructor(product: Product) {
        this.product = product;
    }

    public setProduct(product: Product): void {
        this.product = product;
    }

    public render(): string {
        return `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Pedir pelo WhatsApp</title>
                ${this.product.pixelFacebook}
                <script>
                    setTimeout(function() {
                        window.location.href = 'https://wa.me/5521992628651?text=${encodeURIComponent(this.product.greeting + this.product.name)}';
                    }, ${this.product.redirectDelay});
                </script>
            </head>
            <body>
                <p>Redirecionando para o WhatsApp...</p>
            </body>
            </html>
        `;
    }
}
