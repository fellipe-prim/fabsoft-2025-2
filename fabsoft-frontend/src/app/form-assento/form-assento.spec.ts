import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAssento } from './form-assento';

describe('FormAssento', () => {
  let component: FormAssento;
  let fixture: ComponentFixture<FormAssento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAssento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAssento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
