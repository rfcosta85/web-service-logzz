export interface Repository<T> {
    find(id: string): Promise<T | null>;
    list(): Promise<Array<T>>;
    save(entity: T): Promise<T | null>;
    delete(id: string): Promise<boolean>;
    update(id: string, updateEntity: T): Promise<T | null>;
    partialUpdate(id: string, patchEntity: Partial<T>): Promise<T | null>;
}
