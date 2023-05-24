import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate,
  IsUUID,
} from 'class-validator';
import { IsCron } from '../../utils/ValidateCron';
export class createScheduleDto {
  @ApiProperty()
  @IsString()
  @Validate(IsCron, {
    message: 'Wrong cron expression',
  })
  cronExpression: string;
}
export class editScheduleDto {
  @ApiProperty()
  @IsUUID()
  cronExpression: string;
}
