export interface IRequestLogRepository<T> {
    find(id: string): Promise<T | null>;
    list(): Promise<Array<T>>;
    save(entity: T): Promise<T | null>;
}