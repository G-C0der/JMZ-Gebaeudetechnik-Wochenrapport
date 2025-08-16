import React, { useEffect, useState } from "react";
import moment from 'moment';
import Picker from "../index";

interface MonthPickerProps {
  onChange: (month: string) => void;
}

export default function MonthPicker({ onChange }: MonthPickerProps) {
  const months = moment.months();
  const [monthIdx, setMonthIdx] = useState(moment().month());
  const month = months[monthIdx];

  useEffect(() => {
    onChange(month);
  }, [monthIdx]);

  const decreaseMonth = () => setMonthIdx(
    prevState => prevState === 0 ? months.length - 1 : prevState - 1
  );
  const increaseMonth = () => setMonthIdx(
    prevState => prevState === months.length - 1 ? 0 : prevState + 1
  );

  return (
    <Picker
      value={month}
      handleLeftClick={decreaseMonth}
      handleRightClick={increaseMonth}
      widthPercent={33}
    />
  );
}
