import { TestBed } from '@angular/core/testing';

import { Assento } from './assento';

describe('Assento', () => {
  let service: Assento;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Assento);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
