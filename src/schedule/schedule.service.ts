import { Injectable } from '@nestjs/common';
import { Schedule } from '@prisma/client';
import db from 'src/database/prisma_client';
import { scheduleList, pushScheduler, makeScheduler } from '../utils/cron';
import { createScheduleDto, editScheduleDto } from './dto/schedule.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
@Injectable()
export class ScheduleService {
  async getAll(): Promise<Schedule[]> {
    return await db.schedule.findMany({});
  }
  async addSchedule(data: createScheduleDto): Promise<Schedule> {
    const createData = await db.schedule.create({ data: data });
    await pushScheduler(
      createData.id,
      await makeScheduler(data.cronExpression),
    );
    return createData;
  }
  async getScheduleById(id: string): Promise<Schedule> {
    return await db.schedule.findUnique({ where: { id: id } });
  }
  async disableSchedule(id: string): Promise<Schedule> {
    const findSchedule = this.getScheduleById(id);
    if (!findSchedule) throw Error('Schedule not found!');
    const data = await db.schedule.update({
      where: { id: id },
      data: { isEnable: false },
    });
    if (!data) {
      throw Error('Schedule delete fail');
    }
    scheduleList.forEach((e) => {
      if (e.id === id) {
        console.log(e.id, id);

        e.scheduledTask.stop();
      }
    });

    console.log(data);
    return data;
  }
  async editSchedule(id: string, data: editScheduleDto): Promise<Schedule> {
    const findSchedule = this.getScheduleById(id);
    if (!findSchedule) throw Error('Schedule not found!');
    return await db.schedule.update({ where: { id: id }, data: data });
  }
  async deleteSchedule(id: string): Promise<Schedule> {
    const deleteData = await db.schedule.delete({ where: { id: id } });
    scheduleList.forEach((e) => {
      if (e.id === id) {
        console.log(e.id, id);

        e.scheduledTask.stop();
      }
    });
    return deleteData;
  }
}
