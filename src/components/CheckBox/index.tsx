import React from 'react';
import { Checkbox, CheckboxIndicator, CheckboxIcon, CheckIcon } from "@gluestack-ui/themed";

interface CheckBoxProps {
  value: boolean;
  onChange: (isChecked: boolean) => void;
  isDisabled?: boolean;
  isReadonly?: boolean;
}

export default function CheckBox({ value, onChange, isDisabled, isReadonly }: CheckBoxProps) {
  return (
    <Checkbox size="md" isChecked={value} onChange={isReadonly ? null : onChange} isDisabled={isDisabled}>
      <CheckboxIndicator mr="$2">
        <CheckboxIcon as={CheckIcon} />
      </CheckboxIndicator>
    </Checkbox>
  );
}
