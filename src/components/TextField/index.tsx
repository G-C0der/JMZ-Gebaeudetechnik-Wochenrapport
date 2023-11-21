import React from 'react';
import { Input, InputField, Text } from "@gluestack-ui/themed";
import { FormikProps } from "formik";

interface TextFieldProps {
  placeholder: string;
  field?: string;
  formik?: FormikProps<any>;
  readonly?: boolean;
  [key: string]: any;
}

export function TextField({ placeholder, field, formik, readonly, ...props }: TextFieldProps) {
  const { style, ...otherProps } = (props as any);
  const formikRelatedProps = formik && field ? {
    onBlur: () => formik.handleBlur(field),
    value: formik.values[field],
    onChangeText: (text: string) => formik.setFieldValue(field, text)
  } : {};

  return (
    <>
      <Input isReadOnly={readonly}>
        <InputField
          style={{ paddingTop: 0, paddingBottom: 0, ...style }} // Fix for content area is too high per default
          placeholder={placeholder}
          {...formikRelatedProps}
          {...otherProps}
        />
      </Input>
      {formik && field && formik.touched[field] && formik.errors[field] ? (
        <Text color="red">{formik.errors[field]}</Text>
      ) : null}
    </>
  );
}
