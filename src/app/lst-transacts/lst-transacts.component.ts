import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccessDbService } from '@app/services/access_db/access-db.service';
import { ENVIRONNEMENT } from '@environments/environment';
import { User } from '@app/models/user.model';
import { TransactDisplay } from '@app/models/transactsDisplay.model';
import { format, toZonedTime } from 'date-fns-tz';
import { fr } from 'date-fns/locale/fr';


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
  lstTransactsDisplay:TransactDisplay[] = [];

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
      this.lstTransactsDebit.forEach(td => {
        let userDestination:User = data.users.find(i => i.id === td.toUserId);
        this.lstTransactsDisplay.push({"id":td.id, "type":"débit", "amount": -td.amount, "date": td.date, "first": userDestination.first, "last": userDestination.last});
      });
      this.lstTransactsCredit.forEach(td => {
        let userDestination:User = data.users.find(i => i.id === td.toUserId);
        this.lstTransactsDisplay.push({"id":td.id,"type":"crédit", "amount": td.amount, "date": td.date, "first": userDestination.first, "last": userDestination.last});
      });
      console.log(this.lstTransactsDisplay);
    });
  }

  private getTransactsDebit(user:string, transacts:any) {
    let lstTransactsDebit:User = transacts.filter(i => i.fromUserId === this.userId);
    return lstTransactsDebit;
  }

  private getTransactsCredit(user:string, transacts:any) {
    let lstTransactsCredit:User = transacts.filter(i => i.toUserId === this.userId);
    return lstTransactsCredit;
  }

  public convertToLocalTime(dateString: string): string {
    const date = new Date(dateString);
    //const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timeZone = 'Europe/Paris';
    const zonedDate = toZonedTime(date, timeZone);
    return format(zonedDate, 'EEEE d MMMM yyyy à HH:mm', { timeZone, locale: fr });
  }

}
