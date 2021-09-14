import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapTestTechniqueComponent } from './etap-test-technique.component';

describe('EtapTestTechniqueComponent', () => {
  let component: EtapTestTechniqueComponent;
  let fixture: ComponentFixture<EtapTestTechniqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtapTestTechniqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapTestTechniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
