import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTransactComponent } from './new-transact.component';

describe('NewTransactComponent', () => {
  let component: NewTransactComponent;
  let fixture: ComponentFixture<NewTransactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTransactComponent]
    });
    fixture = TestBed.createComponent(NewTransactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
