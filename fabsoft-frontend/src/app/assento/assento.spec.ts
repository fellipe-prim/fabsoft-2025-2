import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Assento } from './assento';

describe('Assento', () => {
  let component: Assento;
  let fixture: ComponentFixture<Assento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Assento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Assento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
