import { TestBed } from '@angular/core/testing';

import { Consultapaises } from './consultaproductos';

describe('Consultapaises', () => {
  let service: Consultapaises;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Consultapaises);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
