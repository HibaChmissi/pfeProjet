import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageForm1Component } from './message-form1.component';

describe('MessageForm1Component', () => {
  let component: MessageForm1Component;
  let fixture: ComponentFixture<MessageForm1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageForm1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageForm1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
