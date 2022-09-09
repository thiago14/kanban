import MysqlConnection from '../../src/infra/database/MysqlConnection';
import ColumnRepositoryDatabase from '../../src/infra/repository/ColumnRepositoryDatabase';
import ColumnService from '../../src/service/ColumnService';

function initializeTest() {
    const connection = new MysqlConnection();
    const columnRepository = new ColumnRepositoryDatabase(connection);
    const columnService = new ColumnService(columnRepository);
    return { columnService, connection };
}

test('Deve listar as colunas', async function() {
    const { columnService, connection } = initializeTest();
    const columns = await columnService.getColumns(1);
    expect(columns).toHaveLength(3);
    await connection.close();
});

test('Deve salvar uma coluna', async function() {
    const { columnService, connection } = initializeTest();
    const idColumn = await columnService.saveColumn({ idBoard: 1, idColumn: undefined, name: 'Todo', hasEstimative: true });
    const column = await columnService.getColumn(idColumn);
    expect(column.name).toBe("Todo");
    await columnService.deleteColumn(idColumn);
    const columns = await columnService.getColumns(1);
    expect(columns).toHaveLength(3);
    await connection.close();
});