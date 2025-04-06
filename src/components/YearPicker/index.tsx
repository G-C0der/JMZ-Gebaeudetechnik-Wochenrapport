import React, { useEffect, useState } from "react";
import moment from 'moment';
import Button from "../Button";
import { HStack, Box } from "@gluestack-ui/themed";
import { TextField } from "../TextField";

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
    <HStack justifyContent="space-between" alignItems="center">
      <Button
        icon='caretleft'
        action="secondary"
        w='11%'
        onPress={decreaseYear}
      />

      <Box flexBasis="20%">
        <TextField
          value={String(year)}
          isReadonly
          style={{ textAlign: 'center' }}
        />
      </Box>

      <Button
        icon='caretright'
        action="secondary"
        w='11%'
        onPress={increaseYear}
      />
    </HStack>
  );
}
