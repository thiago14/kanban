import Card from '../../domain/entity/Card';
import Connection from '../database/ConnectionInterface';
import CardRepository from '../../domain/interfaces/CardRepository';

type cardData = {
    id_card: number,
    id_column: number,
    title: string,
    color: string,
    estimative: number,
    order: number,
};

export default class CardRepositoryDatabase implements CardRepository {

    constructor(readonly connection:Connection) {}

    _convertCard(cardData: cardData) {
        return new Card(cardData.id_column, cardData.id_card, cardData.title, cardData.estimative, cardData.color, cardData.order);
    }

    _formatCardsList(cardsData: cardData[]) {
        const cards: Card[] = [];
        for (const cardData of cardsData) {
            cards.push(this._convertCard(cardData));
        }
        return cards;
    }

    async findAllByidColumn(id: number): Promise<Card[]> {
        const cardsData = await this.connection.query('SELECT `id_column`, `id_card`, `title`, `estimative`, `color`, `order` FROM cards WHERE `id_column` = ? ORDER BY `order`', [id]);
        return this._formatCardsList(cardsData);
    }

    async list(title: string): Promise<Card[]> {
        const cardsData = await this.connection.query('SELECT * FROM cards WHERE `title` LIKE "%?%"', [title]);
        return this._formatCardsList(cardsData);
    }

    async get(id: number): Promise<Card> {
        const [cardsData] = await this.connection.query('SELECT * FROM cards WHERE `id_card` = ?', [id]);
        if (!cardsData) throw new Error("Card not found");
        return this._convertCard(cardsData);
    }

    async save(card: Card): Promise<number> {
        const cardData = await this.connection.query(
            'INSERT INTO cards (`id_column`, `title`, `estimative`, `color`, `order`) VALUES (?, ?, ?, ?, ?)',
            [card.idColumn, card.title, card.estimative, card.color, card.order]
        )
        return cardData.insertId;
    }

    async update(card: Card): Promise<void> {
        await this.connection.query('UPDATE cards SET `title` = ?, `estimative` = ? WHERE `id_card` = ?', [card.title, card.estimative, card.idCard]);
    }

    async delete(id: number): Promise<void> {
        await this.connection.query('DELETE FROM cards WHERE `id_card` = ?', [id]);
    }

    async updateIdColumnAndOrder(idCard: number, idColumn: number, order: number): Promise<void> {
        await this.connection.query('UPDATE cards SET `id_column` = ?, `order` = ? WHERE `id_card` = ?', [idColumn, order, idCard])
    }

}