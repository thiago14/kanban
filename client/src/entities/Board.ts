import Column from './Column';
import Card from './Card';

export default class Board {
    columns: any;

    constructor(
        readonly idBoard: number,
        readonly name: string
    ) {
        this.columns = [];
    }

    addColumn(columnName: string, hasEstimative: boolean) {
        this.columns.push(new Column(columnName, hasEstimative));
    }

    addCard(columnName: string, cardTitle: string, cardEstimative: number) {
        const column = this.columns.find((column: Column) => column.name == columnName);
        if (!column) throw new Error("Column not found");
        const card = new Card(cardTitle, cardEstimative, 'white');
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