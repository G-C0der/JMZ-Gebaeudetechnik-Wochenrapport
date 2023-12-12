import React from 'react';
import { Checkbox, CheckboxIndicator, CheckboxIcon, CheckIcon } from "@gluestack-ui/themed";

interface CheckBoxProps {
  value: boolean;
  onChange: () => void;
}

export default function CheckBox({ value, onChange }: CheckBoxProps) {
  return (
    <Checkbox size="md" isChecked={value} onChange={onChange}>
      <CheckboxIndicator mr="$2">
        <CheckboxIcon as={CheckIcon} />
      </CheckboxIndicator>
    </Checkbox>
  );
}
