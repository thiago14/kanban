import Column from './Column';
import Card from './Card';
import BaseEntity from './BaseEntity';
import DomainEvent from '../events/DomainEvent';

export default class Board extends BaseEntity {
    columns: any;

    constructor(
        readonly idBoard: number,
        readonly name: string
    ) {
        super();
        this.columns = [];
    }

    addColumn(columnName: string, hasEstimative: boolean, color: string = 'white') {
        this.columns.push(new Column(columnName, hasEstimative));
        this.publish(new DomainEvent('addColumn', {
            idBoard: this.idBoard,
            name: columnName,
            hasEstimative,
            color
        }));
    }

    addCard(columnName: string, cardTitle: string, cardEstimative: number, cardColor: string = 'white') {
        const column = this.columns.find((column: Column) => column.name == columnName);
        if (!column) throw new Error("Column not found");
        const card = new Card(cardTitle, cardEstimative, cardColor);
        column.addCard(card);
    }

    getEstimative() {
        return this.columns.reduce((total: number, column: Column) => {
            total += column.getEstimative();
            return total;
        }, 0);
    }

    increaseEstimative(card: Card) {
        card.increaseEstimative();
    }

    decreaseEstimative(card: Card) {
        card.decreaseEstimative();
    }
}