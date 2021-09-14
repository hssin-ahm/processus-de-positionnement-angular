import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapPositionnementClientComponent } from './etap-positionnement-client.component';

describe('EtapPositionnementClientComponent', () => {
  let component: EtapPositionnementClientComponent;
  let fixture: ComponentFixture<EtapPositionnementClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtapPositionnementClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapPositionnementClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
