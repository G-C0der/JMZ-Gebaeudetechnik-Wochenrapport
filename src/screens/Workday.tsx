import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import DatePicker from "react-native-date-picker";
import { TextField } from "../components/TextField";
import { useFormik } from "formik";
import { workdayValidationSchema } from "../constants";
import { Box, Button, ButtonIcon, ChevronLeftIcon, ChevronRightIcon, Text, VStack } from "@gluestack-ui/themed";
import { SelectField } from "../components/SelectField";
import codes from '../data/codes.json';

export function Workday(): JSX.Element {
  const [date, setDate] = useState(new Date());
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [from2, setFrom2] = useState(new Date());
  const [to2, setTo2] = useState(new Date());

  const formik = useFormik({
    initialValues: {
      date: '',
      from: '',
      to: '',
      from2: '',
      to2: '',
      project: '',
      code: ''
    },
    validationSchema: workdayValidationSchema,
    onSubmit: async (values) => {}
  });

  return (
    <SafeAreaView>
      <Box padding={20}>
        <VStack space='md'>
          <SelectField placeholder='Typ' options={codes} />

          <Button>
            <ButtonIcon as={ChevronLeftIcon} m="$2" w="$7" h="$7" />
          </Button>

          <DatePicker
            date={date}
            onDateChange={setDate}
            androidVariant='nativeAndroid' // TODO: change for IOS
            mode='date'
            textColor='#000000'
            locale='de'
          />

          <Button>
            <ButtonIcon as={ChevronRightIcon} m="$2" w="$7" h="$7" />
          </Button>

          <DatePicker
            date={from}
            onDateChange={setFrom}
            androidVariant='nativeAndroid' // TODO: change for IOS
            mode='time'
            textColor='#000000'
            locale='de'
          />

          <DatePicker
            date={to}
            onDateChange={setTo}
            androidVariant='nativeAndroid' // TODO: change for IOS
            mode='time'
            textColor='#000000'
            locale='de'
          />

          <DatePicker
            date={from2}
            onDateChange={setFrom2}
            androidVariant='nativeAndroid' // TODO: change for IOS
            mode='time'
            textColor='#000000'
            locale='de'
          />

          <DatePicker
            date={to2}
            onDateChange={setTo2}
            androidVariant='nativeAndroid' // TODO: change for IOS
            mode='time'
            textColor='#000000'
            locale='de'
          />

          <TextField placeholder='Projekt' field='project' formik={formik} />
        </VStack>
      </Box>
    </SafeAreaView>
  );
}
