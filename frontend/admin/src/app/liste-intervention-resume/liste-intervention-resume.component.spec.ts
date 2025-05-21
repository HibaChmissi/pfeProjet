import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeInterventionResumeComponent } from './liste-intervention-resume.component';

describe('ListeInterventionResumeComponent', () => {
  let component: ListeInterventionResumeComponent;
  let fixture: ComponentFixture<ListeInterventionResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeInterventionResumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeInterventionResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
