import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvEnvoyeComponent } from './cv-envoye.component';

describe('CvEnvoyeComponent', () => {
  let component: CvEnvoyeComponent;
  let fixture: ComponentFixture<CvEnvoyeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvEnvoyeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvEnvoyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
