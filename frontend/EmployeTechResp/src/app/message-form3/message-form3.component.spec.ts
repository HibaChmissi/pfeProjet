import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageForm3Component } from './message-form3.component';

describe('MessageForm3Component', () => {
  let component: MessageForm3Component;
  let fixture: ComponentFixture<MessageForm3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageForm3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageForm3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
