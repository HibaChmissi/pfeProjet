import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DroitsAccesComponent } from './droits-acces.component';

describe('DroitsAccesComponent', () => {
  let component: DroitsAccesComponent;
  let fixture: ComponentFixture<DroitsAccesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DroitsAccesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DroitsAccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
