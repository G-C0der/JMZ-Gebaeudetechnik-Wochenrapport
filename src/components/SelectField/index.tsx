import React from 'react';
import { SelectScrollView, Select, SelectIcon, SelectInput, SelectTrigger, Icon, ChevronDownIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem } from "@gluestack-ui/themed";
import { FormikProps } from "formik";

interface SelectFieldProps {
  placeholder: string;
  options: { [key: string | number]: string };
  field: string;
  formik: FormikProps<any>;
}

export function SelectField({ placeholder, options, field, formik }: SelectFieldProps) {
  return (
    <Select onValueChange={(value) => formik.setFieldValue(field, value)}>
      <SelectTrigger variant="outline" size="md">
        <SelectInput placeholder={placeholder} style={{ paddingTop: 0, paddingBottom: 0 }} />
        <SelectIcon mr="$3">
          <Icon as={ChevronDownIcon} />
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectScrollView>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {Object.entries(options).map(([key, description]) => (
              <SelectItem key={key} label={description} value={key} />
            ))}
          </SelectScrollView>
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
