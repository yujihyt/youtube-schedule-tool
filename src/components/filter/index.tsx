import { InputNumber, Input, Button } from 'antd';
import { useState } from 'react';

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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: 16 }}>Sunday</span>
        <InputNumber
          placeholder="0"
          min={0}
          style={{ marginRight: 16 }}
          onChange={(value) => handleFilterChange({ sunday: value })}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: 16 }}>Monday:</span>
        <InputNumber
          placeholder="0"
          min={0}
          style={{ marginRight: 16 }}
          onChange={(value) => handleFilterChange({ monday: value })}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: 16 }}>Tuesday:</span>
        <InputNumber
          placeholder="0"
          min={0}
          style={{ marginRight: 16 }}
          onChange={(value) => handleFilterChange({ tuesday: value })}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: 16 }}>Wednesday:</span>
        <InputNumber
          placeholder="0"
          min={0}
          style={{ marginRight: 16 }}
          onChange={(value) => handleFilterChange({ wednesday: value })}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: 16 }}>Thursday:</span>
        <InputNumber
          placeholder="0"
          min={0}
          style={{ marginRight: 16 }}
          onChange={(value) => handleFilterChange({ thursday: value })}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: 16 }}>Friday:</span>
        <InputNumber
          placeholder="0"
          min={0}
          style={{ marginRight: 16 }}
          onChange={(value) => handleFilterChange({ friday: value })}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: 16 }}>Saturday:</span>
        <InputNumber
          placeholder="0"
          min={0}
          style={{ marginRight: 16 }}
          onChange={(value) => handleFilterChange({ saturday: value })}
        />
        <Input
          placeholder="Type your search"
          style={{ width: 200, marginLeft: 16 }}
          onChange={(event) => handleFilterChange({ keyword: event.target.value })}
        />
      </div>
      <Button style={{ marginLeft: 16 }} onClick={handleFilterButtonClick}>Filter</Button>
    </div>
  );
};
