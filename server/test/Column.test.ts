import Column from '../src/domain/entity/Column';

const ColumnModel = {
    idBoard: undefined,
    idColumn: undefined,
    name: 'Column A',
    hasEstimative: true,
};

test('Deve criar uma coluna', function() {
    const column = new Column(ColumnModel.idBoard, ColumnModel.idColumn, ColumnModel.name, ColumnModel.hasEstimative);
    expect(column.name).toBe(ColumnModel.name);
    expect(column.hasEstimative).toBe(ColumnModel.hasEstimative);
});

test('Não deve criar uma coluna sem nome', function() {
    expect(() => new Column(ColumnModel.idBoard, ColumnModel.idColumn,  '', ColumnModel.hasEstimative)).toThrow(new Error('Name is required'));
});