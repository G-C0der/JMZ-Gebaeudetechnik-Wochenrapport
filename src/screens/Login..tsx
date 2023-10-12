import React, { useState } from "react";
import { Text, View } from "react-native";
import * as yup from "yup";
import { useFormik } from "formik";
import { emailValidationSchema, passwordValidationSchema } from "../constants";
import { Box, FormControl, Input, VStack } from "native-base";

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

      // const loginResponse = await login(values);
      // if (!loginResponse.success) setError(loginResponse.error!);

      setIsLoading(false);
    }
  });

  return (
    <View>
      <Box>
        <VStack>
          <Input
            placeholder='Email'
          />
        </VStack>
      </Box>
    </View>
  );
}
