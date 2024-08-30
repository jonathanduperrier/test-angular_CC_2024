import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccessDbService } from '@app/services/access_db/access-db.service';
import { ENVIRONNEMENT } from '@environments/environment';
import { User } from '@app/models/user.model';
import { Transaction } from '@app/models/transaction.model';


@Component({
  selector: 'app-lst-transacts',
  templateUrl: './lst-transacts.component.html',
  styleUrls: ['./lst-transacts.component.scss']
})
export class LstTransactsComponent {
  private selectedData: Subscription;
  @Input() userId:string;
  public currency = ENVIRONNEMENT.currency;
  lstTransactsDebit:any;
  lstTransactsCredit:any;

  constructor(
    private accessDbService: AccessDbService,
  ){ }
  
  ngOnInit() {
    this.displayTransacts();
  }

  ngOnDestroy() {
    this.selectedData.unsubscribe();
  }

  private displayTransacts() {
    this.selectedData = this.accessDbService.getData().subscribe(data => {
      let currentUser:User = data.users.find(i => i.id === this.userId);
      this.lstTransactsDebit = this.getTransactsDebit(this.userId, data.transactions);
      this.lstTransactsCredit = this.getTransactsCredit(this.userId, data.transactions);
      console.log("lstTransactsDebit : ");
      console.log(this.lstTransactsDebit);
      console.log("this.lstTransactsCredit : ");
      console.log(this.lstTransactsCredit);
    });
  }

  private getTransactsDebit(user:string, transacts:any) {
    let lstTransactsDebit:User = transacts.find(i => i.fromUserId === this.userId);
    return lstTransactsDebit;
  }

  private getTransactsCredit(user:string, transacts:any) {
    let lstTransactsCredit:User = transacts.find(i => i.toUserId === this.userId);
    return lstTransactsCredit;
  }

}
