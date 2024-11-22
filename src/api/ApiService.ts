import { ZodObject, ZodRawShape } from 'zod';

export abstract class ApiService<T> {
    protected abstract storageKey: string;
    protected abstract schema: ZodObject<ZodRawShape>;

    public async fetchAll(): Promise<any[]> {
        // Simulace GET requestu (načtení dat z databáze)
        const data = localStorage.getItem(this.storageKey);
        const parsedData = data ? JSON.parse(data) : [];
        return this.schema.array().parse(parsedData); // Validace přes zod
    }

    public async create(item: T): Promise<void> {
        // Simulace POST requestu (uložení dat do databáze)
        const validatedItem = this.schema.parse(item); // Validace jednotlivého záznamu
        const data = await this.fetchAll();
        data.push(validatedItem);
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    public async update(id: string, updatedItem: Partial<T>): Promise<void> {
        // Simulace PUT/PATCH requestu (aktualizace dat v databázi)
        const data = await this.fetchAll();
        const updatedData = data.map((item: any) =>
            item.id === id
                ? {...item, ...this.schema.partial().parse(updatedItem)} // Partial validace
                : item,
        );
        localStorage.setItem(this.storageKey, JSON.stringify(updatedData));
    }

    public async delete(id: string): Promise<void> {
        // Simulace DELETE requestu (smazání dat z databáze)
        const data = await this.fetchAll();
        const filteredData = data.filter((item: any) => item.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(filteredData));
    }
}