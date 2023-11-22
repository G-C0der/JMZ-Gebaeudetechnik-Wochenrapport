import React from "react";
import { SafeAreaView } from "react-native";
import * as yup from "yup";
import { useFormik } from "formik";
import { emailValidationSchema, passwordValidationSchema } from "../constants";
import { Box, Button, Text, VStack } from "@gluestack-ui/themed";
import { useStore } from "../stores";
import { TextField } from "../components/TextField";
import { LoadingButton } from "../components/LoadingButton";

export function LoginScreen() {
  const { userStore: { login, isLoginLoading } } = useStore();

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
    onSubmit: async (values) => await login(values)
  });

  return (
    <SafeAreaView>
      <Box padding={20}>
        <VStack space='md'>
          <TextField placeholder='Email' field='email' formik={formik} />
          <TextField placeholder='Password' field='password' formik={formik} secureTextEntry={true} />

          <LoadingButton text='Login' onPress={() =>  formik.handleSubmit()} loading={isLoginLoading} />
        </VStack>
      </Box>
    </SafeAreaView>
  );
}
