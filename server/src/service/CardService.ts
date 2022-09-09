import Card from '../domain/entity/Card';
import CardRepository from '../domain/interfaces/CardRepository';

export default class CardService {

    constructor(readonly cardRepository: CardRepository){}

    _setCard(input: CardInput): Card {
        return new Card(input.idColumn, input.idCard, input.title, input.estimative, input.color, input.order)
    }

    async list(title: string) {
        return this.cardRepository.list(title);
    }

    async getCards(idColumn: number) {
        const cards = await this.cardRepository.findAllByidColumn(idColumn);
        return cards;
    }

    async getCard(idCard: number) {
        const card = await this.cardRepository.get(idCard);
        return card;
    }

    async saveCard(input: CardInput): Promise<number> {
        const idCard = await this.cardRepository.save(this._setCard(input));
        return idCard;
    }

    async updateCard(input: CardInput): Promise<void> {
        await this.cardRepository.update(this._setCard(input));
    }

    async deleteCard(idCard: number): Promise<void> {
        await this.cardRepository.delete(idCard);
    }

}

type CardInput = {
    idCard: number,
    idColumn: number,
    title: string,
    estimative: number,
    color: string,
    order: number
}