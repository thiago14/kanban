import Board from '../../domain/entity/Board';
import Connection from '../database/ConnectionInterface';
import BoardRepository from '../../domain/interfaces/BoardRepository';

type boardData = {
    id_board: number,
    name: string,
};

export default class BoardRepositoryDatabase implements BoardRepository {

    constructor(readonly connection: Connection) {}

    _convertBoard(boardData: boardData) {
        return new Board(boardData.id_board, boardData.name);
    }

    async findAll(): Promise<Board[]> {
        const boardsData = await this.connection.query('SELECT `id_board`, `name` FROM boards', []);
        const boards: Board[] = [];
        for(const boardData of boardsData) {
            boards.push(this._convertBoard(boardData));
        }
        return boards;
    }

    async get(id: number): Promise<Board> {
        const [boardData] = await this.connection.query('SELECT * FROM boards WHERE `id_board` = ?', [id]);
        if (!boardData) throw new Error("Board not found");
        return this._convertBoard(boardData);
    }

    async save(board: Board): Promise<number> {
        const boardData = await this.connection.query("INSERT INTO boards (`name`) VALUES (?)", [board.name]);
        return boardData.insertId;
    }

    async update(board: Board): Promise<void> {
        await this.connection.query("UPDATE boards SET `name` = ? WHERE `id_board` = ?", [board.name, board.idBoard]);
    }

    async delete(id: number): Promise<void> {
        await this.connection.query("DELETE FROM boards WHERE `id_board` = ?", [id]);
    }

}