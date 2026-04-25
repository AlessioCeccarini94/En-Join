import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiEvento } from './aggiungi-evento';

describe('AggiungiEvento', () => {
  let component: AggiungiEvento;
  let fixture: ComponentFixture<AggiungiEvento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggiungiEvento],
    }).compileComponents();

    fixture = TestBed.createComponent(AggiungiEvento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
