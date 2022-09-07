import Card from '../src/domain/entity/Card';

const CardModel = {
    idCard: undefined,
    idColumn: undefined,
    title: 'Atividade 1',
    estimative: 3,
    order: 3,
};

test('Deve criar um cartão', function() {
    const card = new Card(CardModel.idColumn, CardModel.idCard, CardModel.title, CardModel.estimative, CardModel.order);
    expect(card.title).toBe(CardModel.title);
    expect(card.estimative).toBe(CardModel.estimative);
});

test('Não deve criar um cartão sem título', function() {
    expect(() => new Card(CardModel.idColumn, CardModel.idCard, '', CardModel.estimative, CardModel.order)).toThrow(new Error('Title is required'));
});

test('Não deve criar um cartão com estimativa negativa', function() {
    expect(() => new Card(CardModel.idColumn, CardModel.idCard, CardModel.title, -3)).toThrow(new Error('Estimative must be positive'));
});