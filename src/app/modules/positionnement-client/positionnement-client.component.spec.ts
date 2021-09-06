import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionnementClientComponent } from './positionnement-client.component';

describe('PositionnementClientComponent', () => {
  let component: PositionnementClientComponent;
  let fixture: ComponentFixture<PositionnementClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionnementClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionnementClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
