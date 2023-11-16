import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { emailValidationSchema, passwordValidationSchema } from "../constants";
import { View, Box, Button, Input, Text, VStack } from "native-base";
import { NavigationProp } from "@react-navigation/native";
import { useStore } from "../stores";

interface LoginProps {
  navigation: NavigationProp<any>;
}

export function Login({ navigation }: LoginProps): JSX.Element {
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
    <View>
      <Box p='6'>
        <VStack space='5'>
          <Input
            placeholder='Email'
            onBlur={() => formik.handleBlur('email')}
            value={formik.values.email}
            onChangeText={(text) => formik.setFieldValue('email', text)}
          />
          {formik.touched.email && formik.errors.email ? (
            <Text style={{ color: 'red' }}>{formik.errors.email}</Text>
          ) : null}

          <Input
            placeholder='Passwort'
            onBlur={() => formik.handleBlur('password')}
            value={formik.values.password}
            onChangeText={(text) => formik.setFieldValue('password', text)}
          />
          {formik.touched.password && formik.errors.password ? (
            <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
          ) : null}

          <Button onPress={() => formik.handleSubmit()}>Login</Button>
        </VStack>
      </Box>
    </View>
  );
}
