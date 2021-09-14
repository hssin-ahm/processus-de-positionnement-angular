import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapEntretienPartenaireComponent } from './etap-entretien-partenaire.component';

describe('EtapEntretienPartenaireComponent', () => {
  let component: EtapEntretienPartenaireComponent;
  let fixture: ComponentFixture<EtapEntretienPartenaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtapEntretienPartenaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapEntretienPartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
