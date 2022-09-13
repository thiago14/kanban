import Board from '../entities/Board';

export default interface BoardService {
    getBoard(idBoard: number): Promise<Board>;
}