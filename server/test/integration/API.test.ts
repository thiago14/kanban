import axios from 'axios'

const baseUrl = 'http://localhost:3000';
const headers = {
    Authorization: "Bearer 123456",
};

async function request(url: string, method: string = 'get', data: any = null) {
    const response = await axios({
        url,
        headers,
        method,
        data
    });
    return response.data;
}

test('Deve retornar os quadros por meio da API', async function() {
    const boards = await request(`${baseUrl}/boards`, 'get');
    expect(boards).toHaveLength(2);
    const [board] = boards;
    expect(board.name).toBe('Projeto 1');
    expect(board.idBoard).toBe(1);
});

test('Deve retornar um quadro por meio da API', async function() {
    const board = await request(`${baseUrl}/boards/1`, 'get');
    expect(board.name).toBe('Projeto 1');
    expect(board.idBoard).toBe(1);
});

test('Deve retornar as colunas de um quadro por meio da API', async function() {
    const columns = await request(`${baseUrl}/boards/1/columns`, 'get');
    const [column1, column2, column3] = columns;
    expect(column1.name).toBe('Coluna A');
    expect(column1.idColumn).toBe(1);
    expect(column1.hasEstimative).toBe(1);
    expect(column2.name).toBe('Coluna B');
    expect(column3.name).toBe('Coluna C');
});

test('Deve salvar e deletar uma coluna', async function() {
    const idColumn = await request(`${baseUrl}/boards/1/columns`, 'post', {
        idBoard: 1,
        name: 'Todo',
        hasEstimative: 1,
    });
    const column = await request(`${baseUrl}/boards/1/columns/${idColumn}`, 'get');
    expect(column.name).toBe('Todo');
    await request(`${baseUrl}/boards/1/columns/${idColumn}`, 'delete');
    const columns = await request(`${baseUrl}/boards/1/columns`);
    expect(columns).toHaveLength(3);
});