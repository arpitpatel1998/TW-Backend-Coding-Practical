import {CronJob} from 'cron';
import moment from 'moment';
import {Ride} from '../models/index.js';

// Run cron at Every day 10 AM
const removeRide = new CronJob('* 10 * * *', async () => {
  const time = moment().subtract(process.env.REMOVE_ABLE_HOURS, 'h');
  await Ride.deleteMany({
    updatedAt: {
      $lte: time,
    },
  });
});

export const cronConfig = async () => {
  await removeRide.start();
};

