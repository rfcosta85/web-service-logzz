import { Product } from "../../models/ProductModel";
import { Repository } from "../Crud.repository";
import { supabase } from "../../util/supabase.util";

export class ProductRepository implements Repository<Product> {

    public async find(id: string): Promise<Product | null> {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("id", id)
            .single();
        if (error) {
            console.error("Error in finding the product", error);
            return null;
        }

        return data;
    }

    public async list(): Promise<Array<Product>> { 
        const { data, error } = await supabase
            .from("products")
            .select("*");

        if (error) {
            console.error("Error fetching products:", error);
            return [];
        }

        return data;
    }

    public async save(product: Product): Promise<Product | null> {
        const { data, error} = await supabase
            .from("products")
            .insert([product])
            .select()
            .single();
        if (error) {
            console.error("Error inserting product: ", error);
            return null;
        }

        return data
    }

    public async delete(id: string): Promise<boolean> {
        const { error } = await supabase
            .from("products")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Error deleting product: ", error);
            return false;
        }

        return true;
    }

    public async update(id: string, updateProduct: Product): Promise<Product | null> {
        const { data, error } = await supabase
            .from("products")
            .update(updateProduct)
            .eq("id", id)
            .select()
            .single();

        if (error) {
            console.error("Error updating product: ", error)
            return null;
        }

        return data;
    }

    public async partialUpdate(id: string, patchProduct: Partial<Product>): Promise<Product | null> {
        const { data, error } = await supabase
            .from("products")
            .update(patchProduct)
            .eq("id", id)
            .select()
            .single();

        if (error) {
            console.error("Error updating product: ", error)
            return null;
        }

        return data;
    }

}
