import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntretienPartenaireComponent } from './entretien-partenaire.component';

describe('EntretienPartenaireComponent', () => {
  let component: EntretienPartenaireComponent;
  let fixture: ComponentFixture<EntretienPartenaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntretienPartenaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntretienPartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
