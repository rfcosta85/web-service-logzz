import { Product } from "models/ProductModel";

export class Html {
    static generateHtml(product: Product): string {
        return `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Pedir pelo WhatsApp</title>
                ${product.pixelFacebook}
                <script>
                    setTimeout(function() {
                        window.location.href = 'https://wa.me/5521992628651?text=${encodeURIComponent(product.greeting + product.name)}';
                    }, ${product.redirectDelay});
                </script>
            </head>
            <body>
                <p>Redirecionando para o WhatsApp...</p>
            </body>
            </html>

        `;
    }
}