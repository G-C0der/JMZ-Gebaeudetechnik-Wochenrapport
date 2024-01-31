import React from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import { TextField } from "../TextField";
import Button from "../Button";
import { FormikProps } from "formik";
import { Box } from "@gluestack-ui/themed";

interface TimePickerFieldProps {
  placeholder: string;
  field: string;
  formik: FormikProps<any>;
  openTimePicker: (picker: string) => void;
  isReadOnly?: boolean;
}

export default function TimePickerField({
  placeholder,
  field,
  openTimePicker,
  formik,
  isReadOnly
}: TimePickerFieldProps) {
  const timeTextField = (
    <TextField
      placeholder={placeholder}
      field={field}
      formik={formik}
      value={formik.values[field]}
      isReadOnly
    />
  );

  return (
    <>
      {isReadOnly ? (
        <Box style={styles.textFieldContainer}>
          {timeTextField}
        </Box>
      ) : (
        <TouchableOpacity onPress={() => openTimePicker(field)} style={styles.textFieldContainer}>
          {timeTextField}
        </TouchableOpacity>
      )}

      <Button
        icon='delete'
        action="secondary"
        w='$10'
        isDisabled={isReadOnly || !formik.values[field]}
        onPress={() => formik.setFieldValue(field, null)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  textFieldContainer: {
    flex: 1,
  }
});
