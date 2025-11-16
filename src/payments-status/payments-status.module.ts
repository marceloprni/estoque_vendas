import { Module } from '@nestjs/common';
import { PaymentsStatusService } from './payments-status.service';

@Module({
  providers: [PaymentsStatusService]
})
export class PaymentsStatusModule {}
