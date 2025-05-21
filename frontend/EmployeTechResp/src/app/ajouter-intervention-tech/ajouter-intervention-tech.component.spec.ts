import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterInterventionTechComponent } from './ajouter-intervention-tech.component';

describe('AjouterInterventionTechComponent', () => {
  let component: AjouterInterventionTechComponent;
  let fixture: ComponentFixture<AjouterInterventionTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjouterInterventionTechComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterInterventionTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
