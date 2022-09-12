import MysqlConnection from './infra/database/MysqlConnection';
import ColumnRepositoryDatabase from './infra/repository/ColumnRepositoryDatabase';
import BoardRepositoryDatabase from './infra/repository/BoardRepositoryDatabase';
import CardRepositoryDatabase from './infra/repository/CardRepositoryDatabase';
import ExpressAdapter from './infra/http/ExpressAdapter';
import AuthController from './infra/controller/AuthController';
import BoardController from './infra/controller/BoardController';

const connection = new MysqlConnection();
const boardRepository = new BoardRepositoryDatabase(connection);
const columnRepository = new ColumnRepositoryDatabase(connection);
const cardRepository = new CardRepositoryDatabase(connection);
const http = new ExpressAdapter();

new AuthController(http);
new BoardController(http, connection, boardRepository, columnRepository, cardRepository);

http.listen(3000);
process.on("exit", async function() {
    await connection.close();
});