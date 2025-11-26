import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusIngressos } from './meus-ingressos';

describe('MeusIngressos', () => {
  let component: MeusIngressos;
  let fixture: ComponentFixture<MeusIngressos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeusIngressos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeusIngressos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
