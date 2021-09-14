import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrPartenaireComponent } from './entr-partenaire.component';

describe('EntrPartenaireComponent', () => {
  let component: EntrPartenaireComponent;
  let fixture: ComponentFixture<EntrPartenaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrPartenaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrPartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
