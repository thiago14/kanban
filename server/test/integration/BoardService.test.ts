import MysqlConnection from '../../src/infra/database/MysqlConnection';
import BoardRepositoryDatabase from '../../src/infra/repository/BoardRepositoryDatabase';
import ColumnRepositoryDatabase from '../../src/infra/repository/ColumnRepositoryDatabase';
import CardRepositoryDatabase from '../../src/infra/repository/CardRepositoryDatabase';
import BoardService from '../../src/service/BoardService';

function initializeTest() {
    const connection = new MysqlConnection();
    const boardRepository = new BoardRepositoryDatabase(connection);
    const columnRepository = new ColumnRepositoryDatabase(connection);
    const cardRepository = new CardRepositoryDatabase(connection);
    const boardService = new BoardService(boardRepository, columnRepository, cardRepository);
    return { boardService, connection };
}

test('Deve listar os quadros', async function() {
    const { boardService, connection } = initializeTest();
    const boards = await boardService.getBoards();
    expect(boards).toHaveLength(2);
    const [board] = boards;
    expect(board.name).toBe('Projeto 1');
    connection.close();
});

test('Deve listar um quadro', async function() {
    const { boardService, connection } = initializeTest();
    const board = await boardService.getBoard(1);
    expect(board.name).toBe('Projeto 1');
    const [a, b, c] = board.columns;

    expect(a.name).toBe('Coluna A');
    expect(b.name).toBe('Coluna B');
    expect(c.name).toBe('Coluna C');

    expect(a.estimative).toBe(19);
    expect(b.estimative).toBe(0);
    expect(c.estimative).toBe(0);
    expect(board.estimative).toBe(19);
    connection.close();
});
