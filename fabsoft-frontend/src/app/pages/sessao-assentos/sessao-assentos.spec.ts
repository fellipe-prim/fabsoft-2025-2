import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessaoAssentos } from './sessao-assentos';

describe('SessaoAssentos', () => {
  let component: SessaoAssentos;
  let fixture: ComponentFixture<SessaoAssentos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessaoAssentos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessaoAssentos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
