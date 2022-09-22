import Column from './Column';
import Card from './Card';
import BaseEntity from './BaseEntity';
import DomainEvent from '../events/DomainEvent';

export default class Board extends BaseEntity {
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

    deleteCard(column: Column, idCard: number) {
        column.deleteCard(idCard);
        this.publish(new DomainEvent('deleteCard', {
            idBoard: this.idBoard,
            idColumn: column.idColumn,
            idCard,
        }));
    }

    increaseEstimative(column: Column, card: Card) {
        card.increaseEstimative();
        console.log('column', column);
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
}