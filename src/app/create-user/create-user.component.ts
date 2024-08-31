import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AccessDbService } from '@app/services/access_db/access-db.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  @ViewChild('email') emailInput!: ElementRef;
  @ViewChild('last') lastInput!: ElementRef;
  @ViewChild('first') firstInput!: ElementRef;
  @ViewChild('initial_balance') initialBalanceInput!: ElementRef;
  @ViewChild('password') passwordInput!: ElementRef;

  constructor(
    private router: Router,
    private accessDbService: AccessDbService,
  ) {}

  public register(): void {
    if(this.verifyEmail(this.emailInput.nativeElement.value)){
      let creation_date = this.formatDate(new Date());
      let user:any = {
        first: this.firstInput.nativeElement.value,
        last: this.lastInput.nativeElement.value,
        email: this.emailInput.nativeElement.value,
        created: creation_date,
        initial_balance: this.initialBalanceInput.nativeElement.value * 100,
        password: this.passwordInput.nativeElement.value,
      }
      this.accessDbService.addUser(user);
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

  private formatDate(date: Date): string {
    let options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  public cancel(): void {
    this.router.navigate(['/login']);
  }
}
