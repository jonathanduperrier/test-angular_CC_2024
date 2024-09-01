import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccessDbService } from '@app/services/access_db/access-db.service';
import { ENVIRONNEMENT } from '@environments/environment';
import { User } from '@app/models/user.model';

@Component({
  selector: 'app-display-balance',
  templateUrl: './display-balance.component.html',
  styleUrls: ['./display-balance.component.scss']
})
export class DisplayBalanceComponent {
  private selectedData: Subscription;
  @Input() userId:string;
  @Output() returnCalculatedBalance:EventEmitter<number> = new EventEmitter();
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
    if(this.selectedData){
      this.selectedData.unsubscribe();
    }
  }

  private displayBalance():void {
    this.selectedData = this.accessDbService.getData().subscribe(data => {
      let currentUser:User = data.users.find(i => i.id === this.userId);
      this.initialBalance = Number(currentUser.initial_balance);
      this.calculatedBalance = this.calculateBalance(this.initialBalance, data.transactions);
      this.returnCalculatedBalance.emit(this.calculatedBalance);
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
