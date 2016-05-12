import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { ScheduleService } from './schedule.service';

describe('Schedule Service', () => {
  beforeEachProviders(() => [ScheduleService]);

  it('should ...',
      inject([ScheduleService], (service: ScheduleService) => {
    expect(service).toBeTruthy();
  }));
});
