import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTechniqueClientComponent } from './test-technique-client.component';

describe('TestTechniqueClientComponent', () => {
  let component: TestTechniqueClientComponent;
  let fixture: ComponentFixture<TestTechniqueClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestTechniqueClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTechniqueClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
