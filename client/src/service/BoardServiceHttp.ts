import Board from '../entities/Board';
import HttpClient from '../infra/http/HttpClientInterface';
import BoardServiceInterface, { SaveBoardInput, SaveCardInput, SaveColumnInput, UpdateCardInput } from './BoardServiceInterface';

export default class BoardService implements BoardServiceInterface {

    constructor(readonly httpClient: HttpClient, readonly baseUrl: string) {}

    async getBoards(): Promise<Board[]> {
        const boardsData = await this.httpClient.get(`${this.baseUrl}/boards`);
        const boards: Board[] = [];
        for( const boardData of boardsData) {
            boards.push(new Board(boardData.idBoard, boardData.name));
        }
        return boards;
    }

    async getBoard(idBoard: number): Promise<Board> {
        const boardData = await this.httpClient.get(`${this.baseUrl}/boards/${idBoard}`);
        const board = new Board(boardData.idBoard, boardData.name);
        for( const columnData of boardData.columns) {
            board.addColumn(columnData.idColumn, columnData.name, columnData.hasEstimative);
            for (const cardData of columnData.cards) {
                board.addCard(columnData.name, cardData.idCard, cardData.title, cardData.estimative, cardData.color);
            }
        }
        return board;
    }

    async saveColumn(column: SaveColumnInput): Promise<number> {
        const idColumn = await this.httpClient.post(`${this.baseUrl}/boards/${column.idBoard}/columns`,column);
        return idColumn;
    }

    async saveBoard(board: SaveBoardInput): Promise<number> {
        return await this.httpClient.post(`${this.baseUrl}/boards`, board);
    }

    async deleteColumn(idBoard: number, idColumn: number): Promise<void> {
        return this.httpClient.delete(`${this.baseUrl}/boards/${idBoard}/columns/${idColumn}`);
    }

    async saveCard(card: SaveCardInput): Promise<number> {
        return this.httpClient.post(`${this.baseUrl}/boards/${card.idBoard}/columns/${card.idColumn}/cards`, card);
    }

    async deleteCard(idBoard: number, idColumn: number, idCard: number): Promise<void> {
        return this.httpClient.delete(`${this.baseUrl}/boards/${idBoard}/columns/${idColumn}/cards/${idCard}`);
    }

    async updateCard(card: UpdateCardInput): Promise<void> {
        return this.httpClient.put(`${this.baseUrl}/boards/${card.idBoard}/columns/${card.idColumn}/cards/${card.idCard}`, card);
    }
}
