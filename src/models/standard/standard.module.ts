import { Module } from '@nestjs/common';
import { StandardService } from './standard.service';
import { StandardResolver } from './standard.resolver';

@Module({
  providers: [StandardService, StandardResolver]
})
export class StandardModule {}
