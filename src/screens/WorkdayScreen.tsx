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
  HStack,
  Text,
  VStack
} from "@gluestack-ui/themed";
import { SelectField } from "../components/SelectField";
import codes from '../data/codes.json';

export function WorkdayScreen() {
  const [date, setDate] = useState(new Date());
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [from2, setFrom2] = useState(new Date());
  const [to2, setTo2] = useState(new Date());
  const [isTimePickerModalOpen, setIsTimePickerModalOpen] = useState(false);
  const [currentPicker, setCurrentPicker] = useState(null);

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

  const decreaseDate = () => setDate(currentDate => new Date(currentDate.setDate(currentDate.getDate() - 1)));

  const increaseDate = () => setDate(currentDate => new Date(currentDate.setDate(currentDate.getDate() + 1)));

  const getCurrentDate = () => {
    switch (currentPicker) {
      case 'from':
        return from;
      case 'to':
        return to;
      case 'from2':
        return from2;
      case 'to2':
        return to2;
      default:
        return new Date();
    }
  };

  const openTimePicker = (picker) => {
    setCurrentPicker(picker);
    setIsTimePickerModalOpen(true);
  };

  const onTimeChange = (newTime) => {
    if (currentPicker === 'from') setFrom(newTime);
    else if (currentPicker === 'to') setTo(newTime);
    else if (currentPicker === 'from2') setFrom2(newTime);
    else if (currentPicker === 'to2') setTo2(newTime);
    setIsTimePickerModalOpen(false);
  };

  return (
    <SafeAreaView>
      <Box padding={20}>
        <VStack space='md'>
          <HStack justifyContent="space-between" alignItems="center">
            <Button w='10%' action="secondary" onPress={decreaseDate}>
              <ButtonIcon as={ChevronLeftIcon} m="$2" w="$7" h="$7" />
            </Button>

            <DatePicker
              date={date}
              onDateChange={setDate}
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

          {[from, to, from2, to2].map((time, index) => (
            <TouchableOpacity key={index} onPress={() => openTimePicker(['from', 'to', 'from2', 'to2'][index])}>
              <Text>{time.toLocaleTimeString()}</Text>
            </TouchableOpacity>
          ))}

          {currentPicker && (
            <DatePicker
              modal
              open={isTimePickerModalOpen}
              date={getCurrentDate()}
              onDateChange={onTimeChange}
              androidVariant='nativeAndroid'
              mode='time'
              textColor='#000000'
              locale='de'
              is24hourSource='device'
            />
          )}

          <TextField placeholder='Projekt' field='project' formik={formik} />

          <SelectField placeholder='Typ' options={codes} />

          {/*TODO: hours label*/}

          {/*TODO: save button*/}
        </VStack>
      </Box>
    </SafeAreaView>
  );
}
