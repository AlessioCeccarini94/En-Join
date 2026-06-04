import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizeProfile } from './organize-profile';

describe('OrganizeProfile', () => {
  let component: OrganizeProfile;
  let fixture: ComponentFixture<OrganizeProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizeProfile],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizeProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
