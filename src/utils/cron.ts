import { ScheduleOptions, schedule, ScheduledTask } from 'node-cron';
import db from 'src/database/prisma_client';
import moment from 'moment';
const scheduleOptions: ScheduleOptions = {
  scheduled: false,
  timezone: 'Europe/Paris',
  name: 'simple-task',
  recoverMissedExecutions: false,
};
const scheduleList = [];
let ab = 0;
const getAllSchedule = async () => {
  console.log('get schedule');

  const scheduleDatas = await db.schedule.findMany({
    where: { isEnable: true },
  });
  await scheduleDatas.forEach(async (element) => {
    const scheduleData: ScheduledTask = await makeScheduler(
      element.cronExpression,
    );

    pushScheduler(element.id, scheduleData);
  });

  console.log('final scheduleList', scheduleList);
};
const scheduleAction = async (): Promise<any> => {
  const currentDate = new Date();
  ab++;
  db.jobHistory.create({ data: { createdAt: moment().toDate() } });
  return console.log(
    `Build and send the weekly report - ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()} ${ab}`,
  );

  // Build and send the weekly report
};

const pushScheduler = async (id: string, data: ScheduledTask) => {
  const obj = {
    id: id,
    scheduledTask: data,
  };
  scheduleList.push(obj);
  obj.scheduledTask.start();
};

const makeScheduler = async (
  cronExpression: string,
): Promise<ScheduledTask> => {
  return schedule(cronExpression, scheduleAction, scheduleOptions);
};

getAllSchedule();
export { scheduleList, pushScheduler, makeScheduler };
