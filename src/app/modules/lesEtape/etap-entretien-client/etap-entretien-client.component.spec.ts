import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapEntretienClientComponent } from './etap-entretien-client.component';

describe('EtapEntretienClientComponent', () => {
  let component: EtapEntretienClientComponent;
  let fixture: ComponentFixture<EtapEntretienClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtapEntretienClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapEntretienClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
