import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnexionCompte } from './connexion-compte';

describe('ConnexionCompte', () => {
  let component: ConnexionCompte;
  let fixture: ComponentFixture<ConnexionCompte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnexionCompte]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnexionCompte);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
