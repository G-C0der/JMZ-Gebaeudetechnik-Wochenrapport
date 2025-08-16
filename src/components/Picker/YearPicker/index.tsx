import React, { useEffect, useState } from "react";
import moment from 'moment';
import Picker from "../index";

interface YearPickerProps {
  onChange: (year: number) => void;
}

export default function YearPicker({ onChange }: YearPickerProps) {
  const [year, setYear] = useState(moment().year());

  useEffect(() => {
    onChange(year);
  }, [year]);

  const decreaseYear = () => setYear(prevState => prevState - 1);
  const increaseYear = () => setYear(prevState => prevState + 1);

  return (
    <Picker
      value={year}
      handleLeftClick={decreaseYear}
      handleRightClick={increaseYear}
      widthPercent={20}
    />
  );
}
