import Connection from './ConnectionInterface';
import mysql from 'mysql';

export default class MysqlConnection implements Connection {
    connection: any;

    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'kanban'
        });
    }

    query(statement: string, params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query(statement, params, (error: any, result: any) => {
                if (error) reject(error);
                resolve(result);
            });
        });
    }

    close(): Promise<void> {
        return this.connection.end();
    }

}