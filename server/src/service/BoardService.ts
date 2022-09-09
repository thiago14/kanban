import BoardRepository from '../domain/interfaces/BoardRepository';
import ColumnRepository from '../domain/interfaces/ColumnRepository';
import CardRepository from '../domain/interfaces/CardRepository';

import Board from '../domain/entity/Board';
import Column from '../domain/entity/Column';

export default class BoardService {
    constructor(
        readonly boardRepository: BoardRepository,
        readonly columnRepository: ColumnRepository,
        readonly cardRepository: CardRepository
    ) {}

    _setColumnOutput(column: Column): ColumnOutput {
        return {
            idColumn: column.idColumn,
            name: column.name,
            hasEstimative: column.hasEstimative,
            estimative: 0,
            cards: []
        }
    }

    async getBoards() : Promise<Board[]> {
        const boards = await this.boardRepository.findAll();
        return boards.map((board) => ({ idBoard: board.idBoard, name: board.name }));
    }

    async getBoardByIdBoard(idBoard: number): Promise<Board> {
        const board = await this.boardRepository.get(idBoard);
        return board;
    }

    async getBoard(idBoard: number): Promise<BoardOutput> {
        const board = await this.boardRepository.get(idBoard);
        const output: BoardOutput = {
            idBoard: board.idBoard,
            name: board.name,
            estimative: 0,
            columns: []
        }
        const columns = await this.columnRepository.findAllByidBoard(idBoard);
        for (const column of columns) {
            const columnOutput: ColumnOutput = this._setColumnOutput(column);
            if (!column.idColumn) continue;
            const cards = await this.cardRepository.findAllByidColumn(column.idColumn);
            for (const card of cards) {
                columnOutput.estimative += card.estimative;
                output.estimative += card.estimative;
                columnOutput.cards.push({
                    idCard: card.idCard,
                    title: card.title,
                    estimative: card.estimative,
                    color: card.color,
                    order: card.order
                });
            }
            output.columns.push(columnOutput);
        }
        return output;
    }

    async saveBoard(name: string): Promise<number> {
        return this.boardRepository.save(new Board(undefined, name));
    }

    async updateBoard(idBoard: number, name: string): Promise<void> {
        await this.boardRepository.update(new Board(idBoard, name));
    }

    async deleteBoard(idBoard: number): Promise<void> {
        await this.boardRepository.delete(idBoard);
    }

    async updatePositionMap(input: { [idColumn:number]:number[] }): Promise<void> {
        for (const idColumn in input) {
            let index = 0;
            for (const idCard of input[idColumn]) {
                await this.cardRepository.updateIdColumnAndOrder(idCard, parseInt(idColumn), index++);
            }
        }
    }

}

type ColumnOutput = {
    idColumn?: number,
    name: string,
    estimative: number,
    hasEstimative: boolean,
    cards: {
        idCard?: number,
        title: string,
        estimative: number,
        color: string,
        order: number,
    }[];
};

type BoardOutput = {
    idBoard?: number,
    name: string,
    estimative: number,
    columns: ColumnOutput[],
};