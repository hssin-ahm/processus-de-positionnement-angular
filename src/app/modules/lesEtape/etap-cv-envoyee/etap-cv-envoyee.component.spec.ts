import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapCvEnvoyeeComponent } from './etap-cv-envoyee.component';

describe('EtapCvEnvoyeeComponent', () => {
  let component: EtapCvEnvoyeeComponent;
  let fixture: ComponentFixture<EtapCvEnvoyeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtapCvEnvoyeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapCvEnvoyeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
