import React from 'react';
import { Select, SelectIcon, SelectInput, SelectTrigger, Icon, ChevronDownIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem } from "@gluestack-ui/themed";

interface SelectFieldProps {
  options: { [key: string | number]: string }
}

export function SelectField({ options }: SelectFieldProps) {
  return (
    <Select>
      <SelectTrigger variant="outline" size="md">
        <SelectInput placeholder="Select option" style={{ paddingTop: 0, paddingBottom: 0 }} />
        <SelectIcon mr="$3">
          <Icon as={ChevronDownIcon} />
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {Object.entries(options).map(([key, description]) => (
            <SelectItem id={key} label={description} value={key} />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
