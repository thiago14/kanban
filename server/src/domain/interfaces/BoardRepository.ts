import Board from '../entity/Board';

export default interface BoardRepository {
    findAll(): Promise<Board[]>;
    get(id: number): Promise<Board>;
    save(board: Board): Promise<number>;
    update(board: Board): Promise<void>;
    delete(id: number): Promise<void>;
}