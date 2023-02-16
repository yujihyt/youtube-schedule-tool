interface Duration {
    hour: number;
    minute: number;
    second: number;
  }
  
  interface Video {
    id: string;
    duration: Duration;
  }
  
  interface Day {
    date: Date;
    numberOfVideos: number;
    videos: string[];
    totalDuration: number;
  }
  
  interface DaysOfWeek {
    [key: string]: number;
    sunday: number;
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
  }
  
  const daysOfWeek: DaysOfWeek = {
    sunday: 60,
    monday: 60,
    tuesday: 60,
    wednesday: 60,
    thursday: 60,
    friday: 60,
    saturday: 60,
  };
  
  export const sortVideos = (mockedResponse: Video[]): Day[] => {
    const {highestValue} = findMaxTimeInWeek(daysOfWeek);
    const daysOfWeekKeys = Object.keys(daysOfWeek);
    return mockedResponse.reduce((days: Day[], video: Video) => {
      const { hour, minute, second } = video.duration;
      const videoTime = 3600 * hour + minute * 60 + second;
      if(videoTime>highestValue*60) return days;
  
      let dayAllocated = false;
      for (let i = 0; i < daysOfWeekKeys.length && !dayAllocated; i++) {
        const currentDay = daysOfWeekKeys[i];
        const currentDayDuration = daysOfWeek[currentDay];
        if (videoTime <= currentDayDuration * 60) {
          let lastDay = days[days.length - 1];
          if (!lastDay || (lastDay.totalDuration + videoTime) > currentDayDuration * 60) {
            lastDay = {
              date: new Date(),
              numberOfVideos: 0,
              videos: [],
              totalDuration: 0,
            };
            days.push(lastDay);
          }
          lastDay.videos.push(video.id);
          lastDay.numberOfVideos++;
          lastDay.totalDuration += videoTime;
          dayAllocated = true;
        }
      }
  
      if (!dayAllocated) {
        const newDay: Day = {
          date: new Date(),
          numberOfVideos: 1,
          videos: [video.id],
          totalDuration: videoTime,
        };
        days.push(newDay);
      }
  
      return days;
    }, []);
  };


  const findMaxTimeInWeek = (daysOfWeek:DaysOfWeek) => {
    let highestValue = 0;
    let highestDay = "";

    for (const [day, value] of Object.entries(daysOfWeek)) {
    if (value > highestValue) {
        highestValue = value;
        highestDay = day;
    }
    }
    return {highestDay, highestValue};
  }