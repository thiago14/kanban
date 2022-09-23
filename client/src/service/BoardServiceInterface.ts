import Board from '../entities/Board';

export default interface BoardService {
    getBoard(idBoard: number): Promise<Board>;
    getBoards(): Promise<Board[]>;
    saveBoard(board: SaveBoardInput): Promise<number>;
    saveColumn(column: SaveColumnInput): Promise<number>;
    deleteColumn(idBoard: number, idColumn: number): Promise<void>;
    saveCard(card: SaveCardInput): Promise<number>;
    deleteCard(idBoard: number, idColumn: number, idCard: number): Promise<void>;
    updateCard(card: UpdateCardInput): Promise<void>;
    updatePositionMap(input: UpdatePositionInput): Promise<void>;
}

export type UpdatePositionInput = {
    idBoard: number,
    positionMap: {
        [idColumn: number]: number[]
    }
}

export type SaveBoardInput = {
    name: string
}

export type SaveCardInput = {
    idBoard: number,
    idColumn: number,
    title: string,
    estimative: number,
    color: string
}

export type SaveColumnInput = {
    idBoard: number,
    name: string,
    hasEstimative: boolean
}

export type UpdateCardInput = {
    idBoard: number,
    idColumn: number,
    idCard: number,
    title: string,
    estimative: string,
    color: string,
}