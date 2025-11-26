import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessaoForm } from './sessao-form';

describe('SessaoForm', () => {
  let component: SessaoForm;
  let fixture: ComponentFixture<SessaoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessaoForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessaoForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
