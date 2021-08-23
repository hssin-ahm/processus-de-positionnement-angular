import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionnementsComponent } from './positionnements.component';

describe('PositionnementsComponent', () => {
  let component: PositionnementsComponent;
  let fixture: ComponentFixture<PositionnementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionnementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionnementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
