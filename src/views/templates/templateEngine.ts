import fs from "fs";
import path from "path";

export class TemplateEngine {
    private static templateDir = path.join(__dirname,"..", "templates");

    static render(templatePath: string, data: Record<string, any>): string {
        const filePath = path.join(this.templateDir, `${templatePath}.html`);

        try {
            let template = fs.readFileSync(filePath, "utf-8");
            
            // Aqui eu não iria conseguir retornar uma lista
            // Aqui eu não estou acessando o objeto q vem do model e sim uma string
            template = template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
                return data[key] !== undefined ? data[key] : match
            });
    
            return template;

        } catch (error) {
            console.error('Error rendering template: ', error);
            return 'Template not found';
        }

    }
}

// Middleware - é uma fç q recebe uma req e uma res pode ser colocado  - Preciso criar uma interface com o ip, pais e timestamp 
// IP pego ra req da função
// Pais procurar a lib que realiza isso
// TimeStamp dateNow
// Salvar no supabase as informações de quem acessou essa tela.