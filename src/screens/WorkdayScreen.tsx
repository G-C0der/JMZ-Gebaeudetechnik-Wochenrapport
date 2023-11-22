import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";
import { TextField } from "../components/TextField";
import { useFormik } from "formik";
import { workdayValidationSchema } from "../constants";
import {
  Box,
  Button,
  ButtonIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HStack, ScrollView, Text,
  VStack
} from "@gluestack-ui/themed";
import { SelectField } from "../components/SelectField";
import codes from '../data/codes.json';
import moment from 'moment';

export function WorkdayScreen() {
  const [isTimePickerModalOpen, setIsTimePickerModalOpen] = useState(false);
  const [currentPicker, setCurrentPicker] = useState<string>();

  const formik = useFormik({
    initialValues: {
      date: new Date(),
      from: '',
      to: '',
      from2: '',
      to2: '',
      project: '',
      code: undefined
    },
    validationSchema: workdayValidationSchema,
    onSubmit: async (values) => {}
  });

  const decreaseDate = () =>
    formik.setFieldValue('date', moment(formik.values.date).subtract(1, 'day').toDate());

  const increaseDate = () =>
    formik.setFieldValue('date', moment(formik.values.date).add(1, 'day').toDate());

  const getCurrentDate = () => timeToDate(formik.values[currentPicker!]) || new Date();

  const openTimePicker = (picker: string) => {
    setCurrentPicker(picker);
    setIsTimePickerModalOpen(true);
  };

  const onTimeChange = (newTime: Date) => {
    formik.setFieldValue(currentPicker!, dateToTime(newTime));
    setIsTimePickerModalOpen(false);
  };

  const dateToTime = (time: Date | undefined) => time ? moment(time).format('HH:mm') : '';

  const timeToDate = (time: string) => moment().set({
    hour: parseInt(time.split(':')[0], 10),
    minute: parseInt(time.split(':')[1], 10),
    second: 0
  }).toDate();

  const getTotalTime = () => {
    const parseTime = (time) => time ? moment(time) : null;

    const from = parseTime(formik.values.from);
    const to = parseTime(formik.values.to);
    const from2 = parseTime(formik.values.from2);
    const to2 = parseTime(formik.values.to2);

    const time1 = (from && to) ? Math.max(to.diff(from, 'minutes'), 0) : 0;
    const time2 = (from2 && to2) ? Math.max(to2.diff(from2, 'minutes'), 0) : 0;

    const total = time1 + time2;

    return total ? `${total / 60}h` : null;
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <Box padding={20}>
          <VStack space='md'>
            <HStack justifyContent="space-between" alignItems="center">
              <Button w='10%' action="secondary" onPress={decreaseDate}>
                <ButtonIcon as={ChevronLeftIcon} m="$2" w="$7" h="$7" />
              </Button>

              <DatePicker
                date={formik.values['date']}
                onDateChange={(date) => formik.setFieldValue('date', date)}
                androidVariant='nativeAndroid' // TODO: change on IOS
                mode='date'
                textColor='#000000'
                locale='de'
                style={{ flex: 1 }}
              />

              <Button w='10%' action="secondary" onPress={increaseDate}>
                <ButtonIcon as={ChevronRightIcon} m="$2" w="$7" h="$7" />
              </Button>
            </HStack>

            <HStack space='md'>
              <TouchableOpacity onPress={() => openTimePicker('from')} style={{ flex: 1 }}>
                <TextField
                  placeholder='von'
                  field='from'
                  formik={formik}
                  value={formik.values['from']}
                  readonly
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => openTimePicker('to')} style={{ flex: 1 }}>
                <TextField
                  placeholder='bis'
                  field='to'
                  formik={formik}
                  value={formik.values['to']}
                  readonly
                />
              </TouchableOpacity>
            </HStack>

            <HStack space='md'>
              <TouchableOpacity onPress={() => openTimePicker('from2')} style={{ flex: 1 }}>
                <TextField
                  placeholder='von'
                  field='from2'
                  formik={formik}
                  value={formik.values['from2']}
                  readonly
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => openTimePicker('to2')} style={{ flex: 1 }}>
                <TextField
                  placeholder='bis'
                  field='to2'
                  formik={formik}
                  value={formik.values['to2']}
                  readonly
                />
              </TouchableOpacity>
            </HStack>

            {currentPicker && (
              <DatePicker
                modal
                open={isTimePickerModalOpen}
                date={getCurrentDate()}
                onConfirm={(date) => {
                  setIsTimePickerModalOpen(false);
                  onTimeChange(date);
                }}
                onCancel={() => {
                  setIsTimePickerModalOpen(false);
                }}
                androidVariant='nativeAndroid' // TODO: change on IOS
                mode='time'
                locale='de'
                is24hourSource='device'
              />
            )}

            <TextField placeholder='Projekt' field='project' formik={formik} />

            <SelectField placeholder='Typ' options={codes} field='code' formik={formik} valueFormatter={(value) => parseInt(value)} />

            <TextField placeholder='Stunden' value={getTotalTime()} readonly />

            <Button onPress={() => formik.handleSubmit()}><Text>Speichern</Text></Button>
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
