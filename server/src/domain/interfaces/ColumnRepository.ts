import Column from '../entity/Column';

export default interface ColumnRepository {
    findAllByidBoard(id: number): Promise<Column[]>;
    get(id: number): Promise<Column>;
    save(column: Column): Promise<number>;
    update(column: Column): Promise<void>;
    delete(id: number): Promise<void>;
}