import Column from './Column';
import Card from './Card';
import BaseEntity from './BaseEntity';
import DomainEvent from '../events/DomainEvent';

export default class Board extends BaseEntity {
    selectedCard ?: Card;
    selectedColumn ?: Column;
    columns: Column[];

    constructor(
        readonly idBoard: number,
        readonly name: string
    ) {
        super();
        this.columns = [];
    }

    addColumn(columnId: number|undefined, columnName: string, hasEstimative: boolean) {
        this.columns.push(new Column(columnName, hasEstimative, columnId));
        this.publish(new DomainEvent('addColumn', {
            idBoard: this.idBoard,
            idColumn: columnId,
            name: columnName,
            hasEstimative,
        }));
    }

    addCard(columnName: string, cardId: number| undefined, cardTitle: string, cardEstimative: number, cardColor: string = 'white') {
        const column: Column| undefined = this.columns.find((column: Column) => column.name == columnName);
        if (!column) throw new Error("Column not found");
        const card = new Card(cardTitle, cardEstimative, cardId, cardColor);
        column.addCard(card);
        this.publish(new DomainEvent('addCard', {
            idBoard: this.idBoard,
            idColumn: column.idColumn,
            idCard: cardId,
            ...card
        }));
    }

    deleteColumn(idColumn: number|undefined) {
        const column = this.columns.find((column: Column) => column.idColumn === idColumn);
        if (!column) throw new Error("Column not found");
        this.columns.splice(this.columns.indexOf(column), 1);
        this.publish(new DomainEvent('deleteColumn', {
            idBoard: this.idBoard,
            idColumn: idColumn
        }));
    }

    deleteCard(column: Column, idCard: number|undefined) {
        column.deleteCard(idCard);
        this.publish(new DomainEvent('deleteCard', {
            idBoard: this.idBoard,
            idColumn: column.idColumn,
            idCard,
        }));
    }

    increaseEstimative(column: Column, card: Card) {
        card.increaseEstimative();
        this.publish(new DomainEvent('increaseEstimative', {
            idBoard: this.idBoard,
            idColumn: column.idColumn,
            idCard: card.idCard,
            title: card.title,
            estimative: card.estimative,
            color: card.color,
        }));
    }

    decreaseEstimative(column: Column, card: Card) {
        card.decreaseEstimative();
        this.publish(new DomainEvent('decreaseEstimative', {
            idBoard: this.idBoard,
            idColumn: column.idColumn,
            idCard: card.idCard,
            title: card.title,
            estimative: card.estimative,
            color: card.color
        }));
    }

    getEstimative() {
        return this.columns.reduce((total: number, column: Column) => {
            total += column.getEstimative();
            return total;
        }, 0);
    }

    selectCard(column: Column, card: Card) {
        this.selectedColumn = column;
        this.selectedCard = card;
    }

    moveCard(column: Column) {
        if (!this.selectedCard || !this.selectedColumn || !this.selectedCard.idCard) return;
        if(this.selectedColumn === column) return;

        this.selectedColumn.deleteCard(this.selectedCard.idCard);
        column.addCard(this.selectedCard);
        this.selectedColumn = column;
        this.publish(new DomainEvent('updatePositionMap', {
            idBoard: this.idBoard,
            positionMap: this.generatePositionMap()
        }));
    }

    swap(card: Card) {
        if (!this.selectedCard || !this.selectedColumn || !this.selectedCard.idCard) return;
        if(this.selectedCard === card) return;
        const a = this.selectedColumn.cards.indexOf(card);
        const b = this.selectedColumn.cards.indexOf(this.selectedCard);
        const temp = this.selectedColumn.cards[a];
        this.selectedColumn.cards[a] = this.selectedColumn.cards[b];
        this.selectedColumn.cards[b] = temp;
        this.publish(new DomainEvent('updatePositionMap', {
            idBoard: this.idBoard,
            positionMap: this.generatePositionMap()
        }));
    }

    resetCard() {
        this.selectedCard = undefined;
        this.selectedColumn = undefined;
    }

    generatePositionMap() {
        const positonMap: any = {};
        for (const column of this.columns) {
            if (!column.idColumn) continue;
            positonMap[column.idColumn] = [];
            for (const card of column.cards) {
                if (!card || !card.idCard) continue;
                positonMap[column.idColumn].push(card.idCard);
            }
        }
        return positonMap;
    }
}