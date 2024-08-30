import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LstTransactsComponent } from './lst-transacts.component';

describe('LstTransactsComponent', () => {
  let component: LstTransactsComponent;
  let fixture: ComponentFixture<LstTransactsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LstTransactsComponent]
    });
    fixture = TestBed.createComponent(LstTransactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
