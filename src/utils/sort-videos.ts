import dayjs from 'dayjs';
import { Video } from '../interfaces/video.interface';
import { Day } from './daily-response.interface';
import { DaysOfWeek } from './day-of-week.interface';

export const sortVideos = (videos: Video[], daysOfWeek: DaysOfWeek): Day[] => {
  const initialDays: Day[] = [];
  const values = Object.values(daysOfWeek);
  const maxValue = Math.max(...values);

  return videos.reduce((accumulator: Day[], current: Video) => {
    const {hour, minute, second} = current.duration;
    const videoDuration = hour * 3600 + minute * 60 + second;
    if(videoDuration > maxValue*60) return accumulator;
    let currentDay = accumulator.length > 0 ?
    accumulator[accumulator.length - 1] :
    {
      date: dayjs().toDate(),
      dayOfWeek: dayjs().format('dddd'),
      numberOfVideos: 0,
      videos: [],
      totalDuration: 0,
    };
    while(!currentDay.videos.includes(current.id)){
      const dailyLimit = daysOfWeek[dayjs(currentDay.date).format('dddd').toLowerCase()]*60;
      if(videoDuration + currentDay.totalDuration > dailyLimit){
        currentDay = {
          date: dayjs(currentDay.date).add(1, 'day').toDate(),
          dayOfWeek: dayjs(currentDay.date).add(1, 'day').format("dddd"),
          numberOfVideos: 0,
          videos: [],
          totalDuration:0,
        }
        const index = accumulator.findIndex(day => day.date.getTime() === currentDay.date.getTime());
        if (index === -1) {
          accumulator.push(currentDay);
        } else {
          accumulator[index] = currentDay;
        }
      }
      else {
        currentDay = {
          date: currentDay.date,
          dayOfWeek: currentDay.dayOfWeek,
          numberOfVideos: currentDay.numberOfVideos + 1,
          videos: [...currentDay.videos, current.id],
          totalDuration: currentDay.totalDuration + videoDuration,
        }
        const index = accumulator.findIndex(day => day.date.getTime() === currentDay.date.getTime());
        accumulator[index] = currentDay;
      }
    }
    return accumulator;
  }, initialDays);
};
