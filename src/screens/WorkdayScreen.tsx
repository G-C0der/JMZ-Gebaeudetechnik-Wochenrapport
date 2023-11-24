import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { SafeAreaView } from "react-native";
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
  HStack, ScrollView,
  VStack
} from "@gluestack-ui/themed";
import { SelectField } from "../components/SelectField";
import codes from '../data/codes.json';
import moment from 'moment';
import { round } from "../utils";
import { LoadingButton } from "../components/LoadingButton";
import { store } from "../stores";
import { WorkdayForm, WorkdayFormInit } from "../types";
import TimePickerField from "../components/TimePickerField";

export default observer(function WorkdayScreen() {
  const [isTimePickerModalOpen, setIsTimePickerModalOpen] = useState(false);
  const [currentPicker, setCurrentPicker] = useState<string>();

  const { workScheduleStore: { saveWorkday, isSaveWorkdayLoading } } = store;

  const formik = useFormik<WorkdayFormInit>({
    initialValues: {
      date: new Date(),
      from: null,
      to: null,
      from2: null,
      to2: null,
      project: '',
      code: 0
    },
    validationSchema: workdayValidationSchema,
    onSubmit: async (values) => await saveWorkday(values as WorkdayForm)
  });

  const decreaseDate = () =>
    formik.setFieldValue('date', moment(formik.values.date).subtract(1, 'day').toDate());

  const increaseDate = () =>
    formik.setFieldValue('date', moment(formik.values.date).add(1, 'day').toDate());

  const getCurrentDate = () => timeToDate(formik.values[currentPicker!]);

  const openTimePicker = (picker: string) => {
    setCurrentPicker(picker);
    setIsTimePickerModalOpen(true);
  };

  const onTimeChange = (newTime: Date) => {
    formik.setFieldValue(currentPicker!, dateToTime(newTime));
    setIsTimePickerModalOpen(false);
  };

  const dateToTime = (time: Date | null) => time ? moment(time).format('HH:mm') : '';

  const timeToDate = (time: string | null) => timeToMoment(time).toDate();

  const timeToMoment = (time: string | null) => moment().set(time ? {
    hour: parseInt(time.split(":")[0], 10),
    minute: parseInt(time.split(":")[1], 10),
    second: 0
  } : {});

  const getTotalTime = () => {
    const parseTime = (time: string | null) => time ? timeToMoment(time) : null;

    const from = parseTime(formik.values.from);
    const to = parseTime(formik.values.to);
    const from2 = parseTime(formik.values.from2);
    const to2 = parseTime(formik.values.to2);

    const time1 = (from && to) ? Math.max(to.diff(from, 'minutes'), 0) : 0;
    const time2 = (from2 && to2) ? Math.max(to2.diff(from2, 'minutes'), 0) : 0;

    const total = (time1 + time2) / 60;
    const totalHours = Math.floor(total);
    const totalMinutes = round((total - totalHours) * 60, 0);

    return total ? `${totalHours}h ${totalMinutes}m` : null;
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
              <TimePickerField placeholder='von' field='from' formik={formik} openTimePicker={openTimePicker} />

              <TimePickerField placeholder='bis' field='to' formik={formik} openTimePicker={openTimePicker} />
            </HStack>

            <HStack space='md'>
              <TimePickerField placeholder='von' field='from2' formik={formik} openTimePicker={openTimePicker} />

              <TimePickerField placeholder='bis' field='to2' formik={formik} openTimePicker={openTimePicker} />
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

            <LoadingButton
              text='Speichern'
              onPress={() =>  formik.handleSubmit()}
              loading={isSaveWorkdayLoading}
              icon='save'
            />
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
});
