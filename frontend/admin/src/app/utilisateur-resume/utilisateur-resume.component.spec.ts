import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurResumeComponent } from './utilisateur-resume.component';

describe('UtilisateurResumeComponent', () => {
  let component: UtilisateurResumeComponent;
  let fixture: ComponentFixture<UtilisateurResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UtilisateurResumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilisateurResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
