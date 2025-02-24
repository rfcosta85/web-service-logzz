import { TemplateEngine } from "./templates/templateEngine";
import path from "path";

export class ProductView {  

    static render(template: string, data: any): string {
        const fileRelativePath = path.join('products', template)
        return TemplateEngine.render(fileRelativePath, data)
    }
}
