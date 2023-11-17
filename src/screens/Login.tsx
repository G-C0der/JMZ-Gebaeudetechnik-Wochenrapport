import React from "react";
import { SafeAreaView } from "react-native";
import * as yup from "yup";
import { useFormik } from "formik";
import { emailValidationSchema, passwordValidationSchema } from "../constants";
import { Box, Button, Input, InputField, Text, VStack } from "@gluestack-ui/themed";
import { useStore } from "../stores";
import { TextField } from "../components/TextField";

export function Login(): JSX.Element {
  const { userStore } = useStore();

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
    onSubmit: async (values) => await userStore.login(values)
  });

  return (
    <SafeAreaView>
      <Box padding={20}>
        <VStack space='md'>
          <TextField formik={formik} field='email' placeholder='Email' />
          <TextField formik={formik} field='password' placeholder='Password' secureTextEntry={true} />

          <Button onPress={() => formik.handleSubmit()}><Text>Login</Text></Button>
        </VStack>
      </Box>
    </SafeAreaView>
  );
}
