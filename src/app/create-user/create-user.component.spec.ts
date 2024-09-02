import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { CreateUserComponent } from './create-user.component';
import { Router } from '@angular/router';
import { AccessDbService } from '@app/services/access_db/access-db.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let mockRouter = { navigate: jasmine.createSpy('navigate') };
  let mockAccessDbService = { addUser: jasmine.createSpy('addUser') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUserComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AccessDbService, useValue: mockAccessDbService }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addUser when register is called with valid email', () => {
    component.emailInput = { nativeElement: { value: 'test@example.com' } };
    component.firstInput = { nativeElement: { value: 'John' } };
    component.lastInput = { nativeElement: { value: 'Doe' } };
    component.initialBalanceInput = { nativeElement: { value: 100 } };
    component.passwordInput = { nativeElement: { value: 'password123' } };

    component.register();

    expect(mockAccessDbService.addUser).toHaveBeenCalled();
  });

  it('should not call addUser when register is called with invalid email', () => {
    component.emailInput = { nativeElement: { value: 'invalid-email' } };
    component.firstInput = { nativeElement: { value: 'John' } };
    component.lastInput = { nativeElement: { value: 'Doe' } };
    component.initialBalanceInput = { nativeElement: { value: 100 } };
    component.passwordInput = { nativeElement: { value: 'password123' } };

    component.register();

    expect(mockAccessDbService.addUser).not.toHaveBeenCalled();
  });

  it('should navigate to login on cancel', () => {
    component.cancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
