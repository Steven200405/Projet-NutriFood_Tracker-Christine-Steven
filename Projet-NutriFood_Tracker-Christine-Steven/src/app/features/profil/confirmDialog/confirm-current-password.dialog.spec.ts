import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCurrentPasswordDialog } from './confirm-current-password.dialog';

describe('ConfirmCurrentPasswordDialog', () => {
  let component: ConfirmCurrentPasswordDialog;
  let fixture: ComponentFixture<ConfirmCurrentPasswordDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmCurrentPasswordDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmCurrentPasswordDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
