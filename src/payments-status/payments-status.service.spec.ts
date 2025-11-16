import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsStatusService } from './payments-status.service';

describe('PaymentsStatusService', () => {
  let service: PaymentsStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsStatusService],
    }).compile();

    service = module.get<PaymentsStatusService>(PaymentsStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
