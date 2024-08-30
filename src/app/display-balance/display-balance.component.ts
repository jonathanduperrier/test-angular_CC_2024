import { Component, Input } from '@angular/core';
import { AccessDbService } from '@app/services/access_db/access-db.service';
import { ENVIRONNEMENT } from '@environments/environment';
import { User } from '@app/models/user.model';

@Component({
  selector: 'app-display-balance',
  templateUrl: './display-balance.component.html',
  styleUrls: ['./display-balance.component.scss']
})
export class DisplayBalanceComponent {
  @Input() userId:string;
  public initialBalance:number = 0;
  public currency = ENVIRONNEMENT.currency;

  constructor(
    private accessDbService: AccessDbService,
  ){ }

  ngOnInit() {
    this.displayBalance();
  }

  ngOnDestroy() {

  }

  private displayBalance() {
    this.accessDbService.getData().subscribe(data => {
      let currentUser:User = data.users.find(i => i.id === this.userId);
      console.log("this.userData() : ");
      console.log(this.userId);
      console.log(currentUser);
      this.initialBalance = Number(currentUser.initial_balance);
    });
  }

  private calculateBalance() {
    
  }
  
}
