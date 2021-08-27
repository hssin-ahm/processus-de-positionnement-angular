import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateConsultantComponent } from './update-consultant.component';

describe('UpdateConsultantComponent', () => {
  let component: UpdateConsultantComponent;
  let fixture: ComponentFixture<UpdateConsultantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateConsultantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
