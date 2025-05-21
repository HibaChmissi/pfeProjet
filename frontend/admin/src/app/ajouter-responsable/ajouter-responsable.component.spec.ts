import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterResponsableComponent } from './ajouter-responsable.component';

describe('AjouterResponsableComponent', () => {
  let component: AjouterResponsableComponent;
  let fixture: ComponentFixture<AjouterResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjouterResponsableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
