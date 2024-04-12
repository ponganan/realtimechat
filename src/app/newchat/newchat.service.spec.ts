import { TestBed } from '@angular/core/testing';

import { NewchatService } from './newchat.service';

describe('NewchatService', () => {
  let service: NewchatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewchatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
