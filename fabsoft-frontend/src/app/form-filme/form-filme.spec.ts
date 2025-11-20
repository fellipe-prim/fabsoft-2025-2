import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFilme } from './form-filme';

describe('FormFilme', () => {
  let component: FormFilme;
  let fixture: ComponentFixture<FormFilme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFilme]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFilme);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
