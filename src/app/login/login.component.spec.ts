import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AccessDbService } from '@app/services/access_db/access-db.service';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: any;
  let mockAccessDbService: any;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockAccessDbService = jasmine.createSpyObj(['loginUser']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AccessDbService, useValue: mockAccessDbService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loginUser on signIn', () => {
    component.emailInput = { nativeElement: { value: 'test@example.com' } } as ElementRef;
    component.passwordInput = { nativeElement: { value: 'password' } } as ElementRef;

    component.signIn();

    expect(mockAccessDbService.loginUser).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
  });

  it('should navigate to create-user on register', () => {
    component.register();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/create-user']);
  });
});
