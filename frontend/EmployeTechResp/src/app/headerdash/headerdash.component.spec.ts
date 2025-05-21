import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderdashComponent } from './headerdash.component';

describe('HeaderdashComponent', () => {
  let component: HeaderdashComponent;
  let fixture: ComponentFixture<HeaderdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderdashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
