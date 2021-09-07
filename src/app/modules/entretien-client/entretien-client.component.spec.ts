import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntretienClientComponent } from './entretien-client.component';

describe('EntretienClientComponent', () => {
  let component: EntretienClientComponent;
  let fixture: ComponentFixture<EntretienClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntretienClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntretienClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
