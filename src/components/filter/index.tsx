import { Input, Button } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { mockedResponse } from '../../mocked/mocked-response';
import { sortVideos } from '../../utils/sort-videos';
import { WeekDayInput } from '../weekday-input';

export function Filter({ setVideos, setDaysOfWeek, daysOfWeek }: { setVideos: React.Dispatch<React.SetStateAction<any>>, setDaysOfWeek: React.Dispatch<React.SetStateAction<any>>, daysOfWeek: any }) {
  const [keyword, setKeyword] = useState('');

  const handleFilterChange = (changedFilters: any) => {
    setDaysOfWeek((prevFilters: any) => {
      const newFilters = { ...prevFilters, ...changedFilters };
      setVideos(sortVideos(mockedResponse, newFilters));
      return newFilters;
    });
    if (changedFilters.keyword !== undefined) {
      setKeyword(changedFilters.keyword);
    }
  };

  const handleFilterButtonClick = () => {
    setVideos(sortVideos(mockedResponse, daysOfWeek));
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