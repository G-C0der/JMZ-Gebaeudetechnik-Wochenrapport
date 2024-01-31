import React from 'react';
import { Input, InputField, Text } from "@gluestack-ui/themed";
import { FormikProps } from "formik";

interface TextFieldProps {
  placeholder?: string;
  field?: string;
  formik?: FormikProps<any>;
  isReadOnly?: boolean;
  [key: string]: any;
}

export function TextField({ placeholder, field, formik, isReadOnly, ...props }: TextFieldProps) {
  const formikRelatedProps = formik && field ? {
    onBlur: () => formik.handleBlur(field),
    value: formik.values[field],
    onChangeText: (text: string) => formik.setFieldValue(field, text)
  } : {};

  return (
    <>
      <Input isReadOnly={isReadOnly}>
        <InputField
          pb='$1' // Fix for content area is too high per default
          placeholder={placeholder}
          {...formikRelatedProps}
          {...props}
        />
      </Input>

      {formik && field && formik.touched[field] && formik.errors[field] ? (
        <Text color="red">{formik.errors[field]}</Text>
      ) : null}
    </>
  );
}
