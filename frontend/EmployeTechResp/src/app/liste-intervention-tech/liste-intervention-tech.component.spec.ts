import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeInterventionTechComponent } from './liste-intervention-tech.component';

describe('ListeInterventionTechComponent', () => {
  let component: ListeInterventionTechComponent;
  let fixture: ComponentFixture<ListeInterventionTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeInterventionTechComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeInterventionTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
