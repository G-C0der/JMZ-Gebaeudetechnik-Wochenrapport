import React from 'react';
import { Input, InputField, Text } from "@gluestack-ui/themed";
import { FormikProps } from "formik";

interface TextFieldProps {
  placeholder: string;
  field: string;
  formik: FormikProps<any>;
  [key: string]: any;
}

export function TextField({ formik, field, placeholder, ...props }: TextFieldProps) {
  const { style, ...otherProps } = (props as any);

  return (
    <>
      <Input>
        <InputField
          style={{ paddingTop: 0, paddingBottom: 0, ...style }} // Fix for text area is too high per default
          placeholder={placeholder}
          onBlur={() => formik.handleBlur(field)}
          value={formik.values[field]}
          onChangeText={(text) => formik.setFieldValue(field, text)}
          {...otherProps}
        />
      </Input>
      {formik.touched[field] && formik.errors[field] ? (
        <Text color="red">{formik.errors[field]}</Text>
      ) : null}
    </>
  );
}
