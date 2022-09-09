import Board from '../../src/domain/entity/Board';

test('Deve criar um quadro', function() {
    const board = new Board(1, 'Projeto 1');
    expect(board.name).toBe('Projeto 1');
});