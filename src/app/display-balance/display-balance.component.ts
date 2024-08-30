import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccessDbService } from '@app/services/access_db/access-db.service';
import { ENVIRONNEMENT } from '@environments/environment';
import { User } from '@app/models/user.model';
import { Transaction } from '@app/models/transaction.model';

@Component({
  selector: 'app-display-balance',
  templateUrl: './display-balance.component.html',
  styleUrls: ['./display-balance.component.scss']
})
export class DisplayBalanceComponent {
  private selectedData: Subscription;
  @Input() userId:string;
  public currency = ENVIRONNEMENT.currency;
  public initialBalance:number = 0;
  public calculatedBalance:number = 0;

  constructor(
    private accessDbService: AccessDbService,
  ){ }

  ngOnInit() {
    this.displayBalance();
  }

  ngOnDestroy() {
    this.selectedData.unsubscribe();
  }

  private displayBalance() {
    this.selectedData = this.accessDbService.getData().subscribe(data => {
      let currentUser:User = data.users.find(i => i.id === this.userId);
      this.initialBalance = Number(currentUser.initial_balance);
      this.calculatedBalance = this.calculateBalance(this.initialBalance, data.transactions);
    });
  }

  private calculateBalance(initialBalance:number, transacts:any):number {
    let balance:number = 0;
    balance = initialBalance;

    transacts.forEach(tra => {
      if(tra.fromUserId === this.userId){
        balance = balance - tra.amount;
      } else if(tra.toUserId === this.userId){
        balance = balance + tra.amount;
      } else {
        balance = balance;
      }
    });
    return balance;
  }
  
}
