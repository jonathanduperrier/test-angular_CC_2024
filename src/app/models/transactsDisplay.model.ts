export class TransactDisplay {
    public id:number;
    public amount:number;
    public date:string;
    public type:string;
    public first:string;
    public last:string;

    constructor(
        id: number,
        amount: number,
        date: string,
        type: string,
        first: string,
        last: string,
    ) {
        this.id = id;
        this.amount = amount;
        this.date = date;
        this.type = type;
        this.first = first;
        this.last = last;
    }
}