import { Input, Button } from 'antd';
import { useState } from 'react';
import { mockedResponse } from '../../mocked/mocked-response';
import { sortVideos } from '../../utils/sort-videos';
import { WeekDayInput } from '../weekday-input';
import { api } from '../../providers/youtube-schedule-generator';
import { Video } from '../../interfaces/video.interface';

export function Filter(
  { setVideos, setDaysOfWeek, setKeyword, daysOfWeek, keyword }:
  { setVideos: React.Dispatch<React.SetStateAction<any>>,
    setDaysOfWeek: React.Dispatch<React.SetStateAction<any>>, 
    setKeyword: React.Dispatch<React.SetStateAction<any>>,
    daysOfWeek: any,
    keyword: string }) {
  const [apiVideos, setApiVideos] = useState<Video[]>([]);

  const handleFilterChange = (changedFilters: any) => {
    if (changedFilters.keyword) {
      setKeyword(changedFilters.keyword);
    }
    else{
      setDaysOfWeek((prevFilters: any) => {
        const newFilters = { ...prevFilters, ...changedFilters };
        setVideos(sortVideos(apiVideos, newFilters));
        return newFilters;
      });
    }
  };

  const handleFilterButtonClick = async () => {
    const responseVideos:{data:Video[]} = keyword ? await api.get(`search?searchTerm=${keyword}`) : {data:[]};
    const {data} = responseVideos;
    setApiVideos(data);
    setVideos(sortVideos(data, daysOfWeek));
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <WeekDayInput title="Sunday" onChange={(value:number) => handleFilterChange({ sunday: value })}/>
      <WeekDayInput title="Monday" onChange={(value:number) => handleFilterChange({ monday: value })}/>
      <WeekDayInput title="Tuesday" onChange={(value:number) => handleFilterChange({ tuesday: value })}/>
      <WeekDayInput title="Wednesday" onChange={(value:number) => handleFilterChange({ wednesday: value })}/>
      <WeekDayInput title="Thursday" onChange={(value:number) => handleFilterChange({ thursday: value })}/>
      <WeekDayInput title="Friday" onChange={(value:number) => handleFilterChange({ friday: value })}/>
      <WeekDayInput title="Saturday" onChange={(value:number) => handleFilterChange({ saturday: value })}/>

      <Input
        placeholder="Type your search"
        style={{ width: 200, marginLeft: 16 }}
        onChange={(event) => handleFilterChange({ keyword: event.target.value })}
      />
      <Button style={{ marginLeft: 16 }} onClick={handleFilterButtonClick}>Filter</Button>
    </div>
  );
};