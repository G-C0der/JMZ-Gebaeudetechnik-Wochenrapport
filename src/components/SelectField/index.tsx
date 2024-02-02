import React from 'react';
import {
  SelectScrollView,
  Select,
  SelectIcon,
  SelectInput,
  SelectTrigger,
  Icon,
  ChevronDownIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  Text
} from "@gluestack-ui/themed";
import { FormikProps } from "formik";

interface SelectFieldProps {
  placeholder: string;
  options: { [key: string]: string };
  field: string;
  formik: FormikProps<any>;
  valueFormatter?: (value: string) => unknown;
  isReadonly?: boolean;
}

export function SelectField({ placeholder, options, field, formik, valueFormatter, isReadonly }: SelectFieldProps) {
  const getValue = (value: string) => valueFormatter ? valueFormatter(value) : value;
  const initialDisplay = options[formik.values[field]];

  return (
    <>
      <Select
        key={formik.values[field]} // Ensures that select field gets re-rendered on formik value change
        selectedValue={initialDisplay}
        onValueChange={(value) => formik.setFieldValue(field, getValue(value))}
      >
        <SelectTrigger disabled={isReadonly} variant="outline" size="md">
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

      {formik && field && formik.touched[field] && formik.errors[field] ? (
        <Text color="red">{formik.errors[field]}</Text>
      ) : null}
    </>
  );
}
