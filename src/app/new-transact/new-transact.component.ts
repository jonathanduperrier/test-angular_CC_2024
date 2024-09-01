import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { Subscription } from 'rxjs';
import { AccessDbService } from '@app/services/access_db/access-db.service';
import { EncryptService } from '@app/services/auth/encrypt.service';
import { User } from '@app/models/user.model';

@Component({
  selector: 'app-new-transact',
  templateUrl: './new-transact.component.html',
  styleUrls: ['./new-transact.component.scss']
})
export class NewTransactComponent {
  @ViewChild('email') emailInput!: ElementRef;
  @ViewChild('amount') amountInput!: ElementRef;
  private selectedData: Subscription;
  public token:string = '';
  public objToken:any = [];
  public decodedToken:any = [];
  public userId:string = '';
  public eMail:string = '';
  public balance:number = 0;
  private destUserId:number = 0;

  constructor(
    private router: Router,
    private encrypt: EncryptService,
    private accessDbService: AccessDbService,
  ) {}

  ngOnInit() {
    this.token = this.encrypt.decrypt(localStorage.getItem('token'));
    this.objToken = JSON.parse(this.token);
    this.decodedToken = jwtDecode(this.token);
    this.userId = this.objToken.user.id;
    this.eMail = this.decodedToken.email;
  }

  ngOnDestroy() {
    if(this.selectedData){
      this.selectedData.unsubscribe();
    }
  }

  public newTransact(): void {
    if((this.verifyEmail(this.emailInput.nativeElement.value)) && (this.verifyAmountBalance(this.amountInput.nativeElement.value, this.balance))){
      this.selectedData = this.accessDbService.getData().subscribe(data => {
        let destUser:User = data.users.find(i => i.email === this.emailInput.nativeElement.value);
        ((destUser !== null) && (destUser !== undefined)) ? (this.destUserId = destUser.id) : (this.destUserId = 0);
        if(this.destUserId === 0){
          alert("utilisateur inconnu");
        } else {
          if(window.confirm("Souhaitez-vous vraiment confirmer cette transaction d'un montant de " + this.amountInput.nativeElement.value + "?")){
            console.log("*** transaction confirmée ***");
            let transact:any = {
              fromUserId: this.userId,
              toUserId: this.destUserId,
              amount: (this.amountInput.nativeElement.value * 100),
              date: this.getDateHoursTransact(),
            };
            this.accessDbService.addTransact(transact);
          } else {
            alert("La transaction est annulée.");
            this.router.navigate(['/user']);
          }
        }
      });
    }
  }

  private verifyEmail(email:string): boolean {
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      alert('Veuillez entrer une adresse email valide.');
      return false;
    }
    return true;
  }

  private verifyAmountBalance(amount:number, balance: number): boolean {
    if(amount > (balance/100)){
      alert("Le montant de la transaction est supérieur au solde disponible sur votre compte.");
      return false;
    }
    return true;
  }

  public getBalance(bal:number){
    this.balance = bal;
  }

  private getDateHoursTransact(): string {
    let dateHours = new Date();
    let annee = dateHours.getUTCFullYear();
    let mois = String(dateHours.getUTCMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    let jour = String(dateHours.getUTCDate()).padStart(2, '0');
    let heures = String(dateHours.getUTCHours()).padStart(2, '0');
    let minutes = String(dateHours.getUTCMinutes()).padStart(2, '0');
    let secondes = String(dateHours.getUTCSeconds()).padStart(2, '0');
    return `${annee}-${mois}-${jour}T${heures}:${minutes}:${secondes}Z`;
  }

  public cancel(): void {
    this.router.navigate(['/user']);
  }
}
