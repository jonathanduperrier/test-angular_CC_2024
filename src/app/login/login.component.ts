import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PASSWORD } from '@app/core/constants/apps';
import { AccessDbService } from '@app/services/access_db/access-db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild('email') emailInput!: ElementRef;
  @ViewChild('password') passwordInput!: ElementRef;

  readonly userPassword = PASSWORD;

  constructor(
    private router: Router,
    private accessDbService: AccessDbService,
  ) {}
  public signIn(): void {
    // Code pour se connecter et rediriger vers la page correspondant au composant UserComponent.
    let user:any = {
      email: this.emailInput.nativeElement.value,
      password: this.passwordInput.nativeElement.value,
    };
    console.log('Clic sur le bouton de connexion');
    this.accessDbService.loginUser(user);
  }

  public register(): void {
    this.router.navigate(['/create-user']);
  }
}
