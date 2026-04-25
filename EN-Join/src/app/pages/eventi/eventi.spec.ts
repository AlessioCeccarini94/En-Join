import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Eventi } from './eventi';

describe('Eventi', () => {
  let component: Eventi;
  let fixture: ComponentFixture<Eventi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Eventi],
    }).compileComponents();

    fixture = TestBed.createComponent(Eventi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
