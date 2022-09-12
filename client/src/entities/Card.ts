export default class Card {
    constructor(
        readonly title: string,
        public estimative: number,
        public color: string = 'yellow'
    ) {}

    increaseEstimative () {
        this.estimative++;
    }

    decreaseEstimative () {
        this.estimative--;
    }
}