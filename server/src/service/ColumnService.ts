import Column from '../domain/entity/Column';
import ColumnRepository from '../domain/interfaces/ColumnRepository';

export default class ColumnService {

    constructor(readonly columnRepository: ColumnRepository){}

    _setColumn(input: ColumnInput): Column {
        return new Column(input.idBoard, input.idColumn, input.name, input.hasEstimative);
    }

    async getColumns(idBoard: number) {
        return await this.columnRepository.findAllByidBoard(idBoard);
    }

    async getColumn(idColumn: number) {
        return await this.columnRepository.get(idColumn);
    }

    async saveColumn(input: ColumnInput): Promise<number> {
        const idColumn = await this.columnRepository.save(this._setColumn(input));
        return idColumn;
    }

    async updateColumn(input: ColumnInput): Promise<void> {
        await this.columnRepository.update(this._setColumn(input));
    }

    async deleteColumn(idColumn: number): Promise<void> {
        await this.columnRepository.delete(idColumn);
    }

}

type ColumnInput = {
    idBoard: number,
    idColumn: number | undefined,
    name: string,
    hasEstimative: boolean,
}