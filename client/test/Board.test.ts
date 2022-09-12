import Board from '../src/entities/Board';

test('Deve criar um quadro', function() {
    const board = new Board(1, 'Projeto 1');
    expect(board.name).toBe('Projeto 1');
    expect(board.columns).toHaveLength(0);
    expect(board.getEstimative()).toBe(0);
});

test('Deve cruar um quadro com 3 colunas', function () {
    const board = new Board(1, 'Projeto 1');
    board.addColumn('Todo', true);
    board.addColumn('Doing', true);
    board.addColumn('Done', false);
    expect(board.columns).toHaveLength(3);
});

test('Deve criar um quadro com 1 colunas e 3 cartões', function() {
    const board = new Board(1, 'Projeto 1');
    board.addColumn('Todo', true);
    board.addCard('Todo', 'Atividade 1', 3);
    board.addCard('Todo', 'Atividade 2', 2);
    board.addCard('Todo', 'Atividade 3', 1);
    expect(board.getEstimative()).toBe(6);
});
