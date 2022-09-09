import Column from '../../domain/entity/Column';
import Connection from '../database/ConnectionInterface';
import ColumnRepository from '../../domain/interfaces/ColumnRepository';

type ColumnData = {
    id_board: number,
    id_column: number,
    name: string,
    has_estimative: boolean,
};

export default class ColumnRepositoryDatabase implements ColumnRepository {

    constructor(readonly connection: Connection) {}

    _convertColumn(columnData: ColumnData) {
        return new Column(columnData.id_board, columnData.id_column,  columnData.name, columnData.has_estimative);
    }

    async findAllByidBoard(id: number): Promise<Column[]> {
        const columnsData = await this.connection.query('SELECT id_board, id_column, name, has_estimative FROM columns where id_board = ?', [id]);
        const columns: Column[] = [];
        for(const columnData of columnsData) {
            columns.push(this._convertColumn(columnData));
        }
        return columns;
    }

    async get(id: number): Promise<Column> {
        const [columnData] = await this.connection.query('SELECT * FROM columns WHERE id_column = ?', [id]);
        if (!columnData) throw new Error("Column not found");
        return this._convertColumn(columnData);
    }

    async save(column: Column): Promise<number> {
        const columnData = await this.connection.query(
        "INSERT INTO columns (id_board, name, has_estimative) values (?, ?, ?)",
        [column.idBoard, column.name, column.hasEstimative]
        );
        return columnData.insertId;
    }

    async update(column: Column): Promise<void> {
        await this.connection.query("UPDATE columns (name) set name = ? where id_column = ?", [column.name, column.idColumn]);
    }

    async delete(id: number): Promise<void> {
        await this.connection.query("DELETE FROM Columns where id_Column = ?", [id]);
    }

}