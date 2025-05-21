import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageResumeComponent } from './message-resume.component';

describe('MessageResumeComponent', () => {
  let component: MessageResumeComponent;
  let fixture: ComponentFixture<MessageResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageResumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
