export class User {
    public id: number;
    public first: string;
    public last: string;
    public email: string;
    public password: string;
    public created: string;
    public initial_balance: string;
    
    constructor(
        id: number,
        first: string,
        last: string,
        email: string,
        password: string,
        created: string,
        initial_balance: string,
    ) {
        this.id = id;
        this.first = first;
        this.last = last;
        this.email = email;
        this.password = password;
        this.created = created;
        this.initial_balance = initial_balance;
    }
}
