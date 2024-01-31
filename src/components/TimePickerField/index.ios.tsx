import React from 'react';
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { TextField } from "../TextField";
import Button from "../Button";
import { FormikProps } from "formik";

interface TimePickerFieldProps {
  placeholder: string;
  field: string;
  formik: FormikProps<any>;
  openTimePicker: (picker: string) => void;
}

export default function TimePickerField({ placeholder, field, openTimePicker, formik }: TimePickerFieldProps) {
  return (
    <>
      <View style={styles.textFieldContainer}>
        <TextField
          placeholder={placeholder}
          field={field}
          formik={formik}
          value={formik.values[field]}
          isReadonly
        />
        <TouchableOpacity
          style={styles.overlayTouchable}
          onPress={() => openTimePicker(field)}
        />
      </View>
      <Button
        icon='delete'
        action="secondary"
        w='$10'
        isDisabled={!formik.values[field]}
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
