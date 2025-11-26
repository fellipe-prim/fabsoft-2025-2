import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SessaoService } from './sessao'; 

describe('SessaoService', () => { 
  let service: SessaoService; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SessaoService]
    });
    service = TestBed.inject(SessaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});