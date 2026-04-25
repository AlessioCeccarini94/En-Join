import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventiPrivati } from './eventi-privati';

describe('EventiPrivati', () => {
  let component: EventiPrivati;
  let fixture: ComponentFixture<EventiPrivati>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventiPrivati],
    }).compileComponents();

    fixture = TestBed.createComponent(EventiPrivati);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
