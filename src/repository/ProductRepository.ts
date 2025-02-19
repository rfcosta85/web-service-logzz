import { Product } from "../models/ProductModel";
import config from "../config/config.json"

export class ProductRepository {
    private products: { [key: string]: Product } = {
        "creme-clareador": {
            id: "1",
            name: "Creme Clareador",
            pixelFacebook: `
            <!-- Meta Pixel Code -->
            <script>
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1167931291617315');
            fbq('track', 'PageView');
            </script>
            <noscript><img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=1167931291617315&ev=PageView&noscript=1"
            /></noscript>
            <!-- End Meta Pixel Code -->
            `,
            greeting: config.greeting,
            redirectDelay: config.redirect_delay * 1000
        }
    };

    public getProductById(id: string): Product | null {
        return this.products[id] || null;
    }
}
