import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LesEtapesComponent } from './les-etapes.component';

describe('LesEtapesComponent', () => {
  let component: LesEtapesComponent;
  let fixture: ComponentFixture<LesEtapesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LesEtapesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LesEtapesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
