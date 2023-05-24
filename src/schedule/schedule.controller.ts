import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Schedule } from '@prisma/client';
import { ScheduleService } from './schedule.service';
import { createScheduleDto, editScheduleDto } from './dto/schedule.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  getSchedules(): Promise<Schedule[]> {
    return this.scheduleService.getAll();
  }
  @Post()
  createSchedule(@Body() createSchedule: createScheduleDto): Promise<Schedule> {
    return this.scheduleService.addSchedule(createSchedule);
  }
  @Get('/:id')
  getSchedulesById(@Param('id') id: string): Promise<Schedule> {
    return this.scheduleService.getScheduleById(id);
  }
  @Put('/disable/:id')
  disableSchedule(@Param('id') id: string): Promise<Schedule> {
    return this.scheduleService.disableSchedule(id);
  }
  @Put('/:id')
  editSchedule(
    @Param('id') id: string,
    @Body() editSchedule: editScheduleDto,
  ): Promise<Schedule> {
    return this.scheduleService.editSchedule(id, editSchedule);
  }
  @Delete('/:id')
  deleteSchedule(@Param('id') id: string): Promise<Schedule> {
    return this.scheduleService.deleteSchedule(id);
  }
}
