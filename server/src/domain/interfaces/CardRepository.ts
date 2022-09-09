import Card from '../entity/Card';

export default interface CardRepository {
    findAllByidColumn(id: number): Promise<Card[]>;
    list(title: string): Promise<Card[]>;
    get(id: number): Promise<Card>;
    save(card: Card): Promise<number>;
    update(card: Card): Promise<void>;
    delete(id: number): Promise<void>;
    updateIdColumnAndOrder(idCard: number, idColumn: number, order: number): Promise<void>;
}