import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefingComponent } from './briefing.component';

describe('BriefingComponent', () => {
  let component: BriefingComponent;
  let fixture: ComponentFixture<BriefingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BriefingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
