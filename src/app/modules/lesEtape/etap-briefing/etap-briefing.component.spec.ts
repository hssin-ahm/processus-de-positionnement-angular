import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapBriefingComponent } from './etap-briefing.component';

describe('EtapBriefingComponent', () => {
  let component: EtapBriefingComponent;
  let fixture: ComponentFixture<EtapBriefingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtapBriefingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapBriefingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
