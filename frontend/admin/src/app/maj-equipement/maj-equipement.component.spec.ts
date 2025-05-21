import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajEquipementComponent } from './maj-equipement.component';

describe('MajEquipementComponent', () => {
  let component: MajEquipementComponent;
  let fixture: ComponentFixture<MajEquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MajEquipementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MajEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
