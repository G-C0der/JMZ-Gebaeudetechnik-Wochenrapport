import React from "react";
import { observer } from "mobx-react-lite";
import * as yup from "yup";
import { useFormik } from "formik";
import { emailValidationSchema, passwordValidationSchema } from "../constants";
import { useStore } from "../stores";
import Screen from "./Screen";
import { TextField } from "../components/TextField";
import { LoadingButton } from "../components/LoadingButton";
import { Credentials } from "../types";

export default observer(function LoginScreen() {
  const { userStore: { login, isLoginLoading } } = useStore();

  const validationSchema = yup.object({
    email: emailValidationSchema,
    password: passwordValidationSchema,
  });

  const formik = useFormik<Credentials>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const success = await login(values);
      if (success) formik.resetForm();
    }
  });

  return (
    <Screen>
      <TextField placeholder='Email' field='email' formik={formik} />
      <TextField placeholder='Password' field='password' formik={formik} secureTextEntry={true} />

      <LoadingButton
        text='Login'
        icon='login'
        onPress={formik.submitForm}
        loading={isLoginLoading}
      />
    </Screen>
  );
});
