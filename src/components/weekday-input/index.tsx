import { InputNumber } from "antd";

interface WeekDayInputProps {
  title: string;
  onChange: (value: number) => void;
}

export function WeekDayInput({ title, onChange }: WeekDayInputProps) {
  const handleFilterChange = (value: any) => {
    onChange(value);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: 16 }}>{title}:</span>
      <InputNumber
        placeholder="0"
        min={0}
        style={{ marginRight: 16 }}
        onChange={handleFilterChange}
      />
    </div>
  );
}