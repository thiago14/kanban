import Http from '../http/HttpInterface';
import Connection from '../database/ConnectionInterface';
import BoardRepository from '../../domain/interfaces/BoardRepository';
import ColumnRepository from '../../domain/interfaces/ColumnRepository';
import CardRepository from '../../domain/interfaces/CardRepository';
import BoardService from '../../service/BoardService';
import ColumnService from '../../service/ColumnService';
import CardService from '../../service/CardService';

export default class BoardController {

    constructor(
        readonly http: Http,
        readonly connection: Connection,
        readonly boardRepository: BoardRepository,
        readonly columnRepository: ColumnRepository,
        readonly cardRepository: CardRepository
    ) {
        /* Boards */
        http.route('get', '/boards', async function() {
            const boardService = new BoardService(boardRepository, columnRepository, cardRepository);
            const boards = await boardService.getBoards();
            return boards;
        });

        http.route('get', '/boards/:idBoard', async function(params: any) {
            const boardService = new BoardService(boardRepository, columnRepository, cardRepository);
            const board = await boardService.getBoard(params.idBoard);
            return board;
        });

        http.route('post', '/boards/:idBoard/updatePositionMap', async function(params: any, body: any) {
            const boardService = new BoardService(boardRepository, columnRepository, cardRepository);
            await boardService.updatePositionMap(body);
        });

        /* Columns */
        http.route('get', '/boards/:idBoard/columns', async function(params: any) {
            const columnService = new ColumnService(columnRepository);
            const columns = await columnService.getColumns(parseInt(params.idBoard));
            return columns;
        });

        http.route('get', '/boards/:idBoard/columns/:idColumn', async function(params: any) {
            const columnService = new ColumnService(columnRepository);
            const column = await columnService.getColumn(parseInt(params.idColumn));
            return column;
        });

        http.route('post', '/boards/:idBoard/columns', async function(params: any, body: any) {
            const columnService = new ColumnService(columnRepository);
            const idColumn = await columnService.saveColumn(body);
            return idColumn;
        });

        http.route('delete', '/boards/:idBoard/columns/:idColumn', async function(params: any) {
            const columnService = new ColumnService(columnRepository);
            await columnService.deleteColumn(parseInt(params.idColumn));

        });

        /* Cards */
        http.route('get', '/boards/:idBoard/columns/:idColumn/cards', async function(params: any) {
            const cardService = new CardService(cardRepository);
            const cards = await cardService.getCards(params.idColumn);
            return cards;
        });

        http.route('post', '/boards/:idBoard/columns/:idColumn/cards', async function(params: any, body: any) {
            const cardService = new CardService(cardRepository);
            const idCard = await cardService.saveCard(body);
            return idCard;
        });

        http.route('put', '/boards/:idBoard/columns/:idColumn/cards/:idCard', async function(params: any, body: any) {
            const cardService = new CardService(cardRepository);
            return cardService.updateCard(body);
        });

        http.route('delete', '/boards/:idBoard/columns/:idColumn/cards/:idCard', async function(params: any) {
            const cardService = new CardService(cardRepository);
            await cardService.deleteCard(parseInt(params.idCard));

        });

    }

}