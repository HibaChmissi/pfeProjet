import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlerteResumeComponent } from './alerte-resume.component';

describe('AlerteResumeComponent', () => {
  let component: AlerteResumeComponent;
  let fixture: ComponentFixture<AlerteResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlerteResumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlerteResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
