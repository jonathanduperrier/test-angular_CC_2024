import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { AccessDbService } from '@app/services/access_db/access-db.service';
import { EncryptService } from '@app/services/auth/encrypt.service';

@Component({
  selector: 'app-new-transact',
  templateUrl: './new-transact.component.html',
  styleUrls: ['./new-transact.component.scss']
})
export class NewTransactComponent {
  @ViewChild('email') emailInput!: ElementRef;
  @ViewChild('amount') amountInput!: ElementRef;

  public token:string = '';
  public objToken:any = [];
  public decodedToken:any = [];
  public userId:string = '';
  public eMail:string = '';
  public balance:number = 0;

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

  public newTransact(): void {
    if((this.verifyEmail(this.emailInput.nativeElement.value)) && (this.verifyAmountBalance(this.amountInput.nativeElement.value, this.balance))){
      console.log("newTransact");
      console.log("email utilisateur : " + this.eMail);
      console.log("email destinataire : " + this.emailInput.nativeElement.value);
      console.log("montant transaction : " + this.amountInput.nativeElement.value);
      console.log("solde : " + this.balance/100);
      
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

  public cancel(): void {
    this.router.navigate(['/user']);
  }
}
