import { InputNumber, Input, Button } from 'antd';
import { useState } from 'react';
import { WeekDayInput } from '../weekday-input';

export function Filter() {
  const initialState = {
    sunday: 0,
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    keyword: "",
  };

  const [filters, setFilters] = useState(initialState);

  const handleFilterChange = (changedFilters: any) => {
    setFilters((prevFilters) => {
      return { ...prevFilters, ...changedFilters };
    });
  };

  const handleFilterButtonClick = () => {
    // apply filters here
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
