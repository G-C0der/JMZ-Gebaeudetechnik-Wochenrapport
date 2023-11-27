import React from 'react';
import { TouchableOpacity } from "react-native";
import { TextField } from "../TextField";
import { Button } from "@gluestack-ui/themed";
import { FormikProps } from "formik";
import Icon from "../Icon";

interface TimePickerFieldProps {
  placeholder: string;
  field: string;
  formik: FormikProps<any>;
  openTimePicker: (picker: string) => void;
}

export default function TimePickerField({ placeholder, field, openTimePicker, formik }: TimePickerFieldProps) {
  return (
    <>
      <TouchableOpacity onPress={() => openTimePicker(field)} style={{ flex: 1 }}>
        <TextField
          placeholder={placeholder}
          field={field}
          formik={formik}
          value={formik.values[field]}
          readonly
        />
      </TouchableOpacity>
      <Button
        action="secondary"
        w='$10'
        style={{ paddingLeft: 3, paddingRight: 3 }}
        isDisabled={!formik.values[field]}
        onPress={() => formik.setFieldValue(field, null)}
      >
        <Icon name='delete' />
      </Button>
    </>
  );
}
