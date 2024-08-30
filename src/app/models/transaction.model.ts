export class Transaction {
    public id:number;
    public fromUserId:number;
    public toUserId:number;
    public amount:number;
    public date:string;

    constructor(
        id: number,
        fromUserId: number,
        toUserId: number,
        amount: number,
        date: string,
    ) {
        this.id = id;
        this.fromUserId = fromUserId;
        this.toUserId = toUserId;
        this.amount = amount;
        this.date = date;
    }
}