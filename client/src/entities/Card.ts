export default class Card {

    constructor(
        readonly title: string,
        public estimative: number,
        readonly idCard?: number,
        public color: string = 'yellow',
        public order: number = 0
    ) {}

    increaseEstimative ():void {
        this.estimative++;
    }

    decreaseEstimative ():void {
        this.estimative--;
    }
}