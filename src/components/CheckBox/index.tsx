import React from 'react';
import { Checkbox, CheckboxIndicator, CheckboxIcon, CheckIcon } from "@gluestack-ui/themed";

interface CheckBoxProps {
  value: boolean;
  onChange: () => void;
  isDisabled?: boolean;
  isReadOnly?: boolean;
}

export default function CheckBox({ value, onChange, isDisabled, isReadOnly }: CheckBoxProps) {
  return (
    <Checkbox size="md" isChecked={value} onChange={isReadOnly ? null : onChange} isDisabled={isDisabled}>
      <CheckboxIndicator mr="$2">
        <CheckboxIcon as={CheckIcon} />
      </CheckboxIndicator>
    </Checkbox>
  );
}
