import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterTechnicienComponent } from './ajouter-technicien.component';

describe('AjouterTechnicienComponent', () => {
  let component: AjouterTechnicienComponent;
  let fixture: ComponentFixture<AjouterTechnicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjouterTechnicienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterTechnicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
