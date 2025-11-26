import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessaoList } from './sessao-list';

describe('SessaoList', () => {
  let component: SessaoList;
  let fixture: ComponentFixture<SessaoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessaoList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessaoList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
