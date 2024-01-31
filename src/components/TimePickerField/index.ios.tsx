import React from 'react';
import { TouchableOpacity, StyleSheet } from "react-native";
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
  return (
    <>
      <Box style={styles.textFieldContainer}>
        <TextField
          placeholder={placeholder}
          field={field}
          formik={formik}
          value={formik.values[field]}
          isReadOnly
        />
        {!isReadOnly && (
          <TouchableOpacity
            style={styles.overlayTouchable}
            onPress={() => openTimePicker(field)}
          />
        )}
      </Box>

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
  },
  overlayTouchable: {
    ...StyleSheet.absoluteFillObject, // This will make the touchable cover the entire area of the container
    backgroundColor: 'transparent', // Ensure the touchable is transparent
  },
});
