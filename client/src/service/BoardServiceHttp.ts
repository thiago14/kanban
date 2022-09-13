import Board from '../entities/Board';
import HttpClient from '../infra/http/HttpClientInterface';
import BoardServiceInterface, { SaveColumnInput } from './BoardServiceInterface';

export default class BoardService implements BoardServiceInterface {

    constructor(readonly httpClient: HttpClient, readonly baseUrl: string) {}

    async getBoard(idBoard: number): Promise<Board> {
        const boardData = await this.httpClient.get(`${this.baseUrl}/boards/${idBoard}`);
        const board = new Board(boardData.idBoard, boardData.name);
        for( const columnData of boardData.columns) {
            board.addColumn(columnData.name, columnData.hasEstimative);
            for (const cardData of columnData.cards) {
                board.addCard(columnData.name, cardData.title, cardData.estimative, cardData.color);
            }
        }
        return board;
    }

    async saveColumn(column: SaveColumnInput): Promise<number> {
        const idColumn = await this.httpClient.post(`${this.baseUrl}/boards/${column.idBoard}/columns`,column);
        return idColumn;
    }

}
