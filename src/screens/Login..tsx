import React, { useState } from "react";
import { View } from "react-native";
import * as yup from "yup";
import { useFormik } from "formik";
import { emailValidationSchema, passwordValidationSchema } from "../constants";
import { Box, Button, Heading, Input, VStack } from "native-base";

export function Login(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object({
    email: emailValidationSchema,
    password: passwordValidationSchema,
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      console.log(values)
      // const loginResponse = await login(values);
      // if (!loginResponse.success) setError(loginResponse.error!);

      setIsLoading(false);
    }
  });

  return (
    <View>
      <Box p='6'>
        <VStack space='5'>
          <Heading size='xl'>Login</Heading >

          <Input
            placeholder='Email'
            onBlur={formik.handleBlur}
            value={formik.values.email}
            onChange={formik.handleChange}
          />

          <Input
            placeholder='Kennwort'
            onBlur={formik.handleBlur}
            value={formik.values.password}
            onChange={formik.handleChange}
          />

          <Button onPress={() => formik.handleSubmit()}>Login</Button>
        </VStack>
      </Box>
    </View>
  );
}
