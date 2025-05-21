import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementsResumeComponent } from './equipements-resume.component';

describe('EquipementsResumeComponent', () => {
  let component: EquipementsResumeComponent;
  let fixture: ComponentFixture<EquipementsResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquipementsResumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipementsResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
