import React, { useEffect, useState, useRef } from "react";
import { Dimensions, FlatList, View } from "react-native";
import { observer } from "mobx-react-lite";
import { useFormik } from "formik";
import { codeMap, workdayFieldLengths, workdayValidationSchema } from "../constants";
import Screen from "./Screen";
import {
  HStack, VStack, Box
} from "@gluestack-ui/themed";
import DatePicker from "react-native-date-picker";
import { TextField } from "../components/TextField";
import Button from '../components/Button';
import { SelectField } from "../components/SelectField";
import moment from 'moment';
import { round, toDateOnly, toDateWithLocalMidnight } from "../utils";
import { LoadingButton } from "../components/LoadingButton";
import { useStore } from "../stores";
import { WorkdayForm } from "../types";
import TimePickerField from "../components/TimePickerField";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../services";

interface ReportScreenProps {
  route: RouteProp<RootStackParamList, 'workStateScreen'>;
}

export default observer(function ReportScreen({ route }: ReportScreenProps) {
  const { user: viewUser, workweekStart } = route.params || {};

  type TimePicker = 'from' | 'to' | 'from2' | 'to2';
  const [isTimePickerModalOpen, setIsTimePickerModalOpen] = useState(false);
  const [currentTimePicker, setCurrentTimePicker] = useState<TimePicker>();

  const {
    workScheduleStore: {
      saveWorkday,
      isSaveWorkdayLoading,
      fetchWorkweek,
      currentWorkweek,
      isFetchWorkweekLoading,
      getWorkdayFromCurrentWorkweek,
      resetCurrentWorkweek
    },
    userStore: {
      user
    }
  } = useStore();

  const isAdminViewMode = !!viewUser && viewUser.id !== user?.id;

  const formik = useFormik<WorkdayForm>({
    initialValues: {
      date: toDateWithLocalMidnight(toDateOnly(workweekStart)),
      'from-0': null,
      'to-0': null,
      'from2-0': null,
      'to2-0': null,
      'project-0': '',
      'code-0': 0,
    },
    validationSchema: workdayValidationSchema,
    onSubmit: async (values) => await saveWorkday(values as WorkdayForm)
  });

  useEffect(() => {
    const syncWorkdayForm = async () => {
      if (!formik.values.date) return;

      await fetchWorkweek(formik.values.date, viewUser?.id);

      const { workday: currentWorkday, projectsCount } = getWorkdayFromCurrentWorkweek(formik.values.date) || {};
      console.log(currentWorkday,projectsCount)
      if (currentWorkday) {
        await formik.setValues({
          ...currentWorkday,
          date: formik.values.date
        });
        setProjectForms([...Array(projectsCount).keys()]);
      } else {
        formik.resetForm({
          values: {
            ...formik.initialValues,
            date: formik.values.date
          }
        });
        setProjectForms([0]);
        flatListRef.current?.scrollToIndex({ index: 0, animated: false });
      }
    };

    syncWorkdayForm();
  }, [formik.values.date]);

  useEffect(() => () => resetCurrentWorkweek());

  const decreaseDate = async () => {
    const dateMinusOneDay = moment(formik.values.date).subtract(1, "day").toDate();
    await formik.setFieldValue("date", dateMinusOneDay);
  };

  const increaseDate = async () => {
    const datePlusOneDay = moment(formik.values.date).add(1, "day").toDate();
    await formik.setFieldValue("date", datePlusOneDay);
  };

  const getCurrentDate = () => timeToDate(formik.values[currentTimePicker!]);

  const openTimePicker = (picker: string) => {
    setCurrentTimePicker(picker as TimePicker);
    setIsTimePickerModalOpen(true);
  };

  const onTimeChange = (newTime: Date) => {
    formik.setFieldValue(currentTimePicker!, dateToTime(newTime));
    setIsTimePickerModalOpen(false);
  };

  const dateToTime = (time: Date | null) => time ? moment(time).format('HH:mm') : '';

  const timeToDate = (time: string | null) => timeToMoment(time).toDate();

  const timeToMoment = (time: string | null) => moment().set(time ? {
    hour: parseInt(time.split(":")[0], 10),
    minute: parseInt(time.split(":")[1], 10),
    second: 0
  } : {});

  const getTotalTime = (idx?: number) => {
    const parseTime = (field: TimePicker, i: number) => {
      const key = `${field}-${i}` as keyof typeof formik.values;
      const time = formik.values[key] as string;
      return time ? timeToMoment(time) : null;
    };

    const indexes = idx !== undefined
      ? [idx]
      : Object.keys(formik.values)
        .filter(k => k.startsWith('project-'))
        .map(k => Number(k.split('-')[1]))
        .filter(i => !isNaN(i));

    let total = 0;

    for (const i of indexes) {
      const from = parseTime('from', i);
      const to = parseTime('to', i);
      const from2 = parseTime('from2', i);
      const to2 = parseTime('to2', i);

      total += (from && to) ? Math.max(to.diff(from, 'minutes'), 0) : 0;
      total += (from2 && to2) ? Math.max(to2.diff(from2, 'minutes'), 0) : 0;
    }

    if (!total) return null;
    total = total / 60;

    const totalHours = Math.floor(total);
    const totalMinutes = round((total - totalHours) * 60, 0);

    return `${totalHours}h ${totalMinutes}m`;
  };

  const isReadonly = () => isAdminViewMode || isFetchWorkweekLoading || (!user?.admin && currentWorkweek?.approved);

  const [projectForms, setProjectForms] = useState([0]);
  const flatListRef = useRef<any>(null);

  const addProjectForm = () => {
    setProjectForms((prev) => {
      const newIdx = prev.length;
      formik.setFieldValue(`from-${newIdx}`, null);
      formik.setFieldValue(`to-${newIdx}`, null);
      formik.setFieldValue(`from2-${newIdx}`, null);
      formik.setFieldValue(`to2-${newIdx}`, null);
      formik.setFieldValue(`project-${newIdx}`, '');
      formik.setFieldValue(`code-${newIdx}`, 0);
      return [...prev, newIdx];
    });
    setTimeout(() => flatListRef.current?.scrollToIndex({ index: projectForms.length, animated: true }), 100);
  };

  const PROJECT_FORM_WIDTH = Dimensions.get('window').width - 40;
  const PROJECT_FORM_SPACING = 20;
  const PROJECT_FORM_TOTAL_WIDTH = PROJECT_FORM_WIDTH + PROJECT_FORM_SPACING;

  const renderProjectForm = (idx: number) => (
    <VStack space='md' style={{ width: PROJECT_FORM_WIDTH }}>
      <HStack space='md'>
        <TimePickerField
          placeholder='von'
          field={`from-${idx}`}
          formik={formik}
          openTimePicker={openTimePicker}
          isReadonly={isReadonly()}
        />

        <TimePickerField
          placeholder='bis'
          field={`to-${idx}`}
          formik={formik}
          openTimePicker={openTimePicker}
          isReadonly={isReadonly()}
        />
      </HStack>

      <HStack space='md'>
        <TimePickerField
          placeholder='von'
          field={`from2-${idx}`}
          formik={formik}
          openTimePicker={openTimePicker}
          isReadonly={isReadonly()}
        />

        <TimePickerField
          placeholder='bis'
          field={`to2-${idx}`}
          formik={formik}
          openTimePicker={openTimePicker}
          isReadonly={isReadonly()}
        />
      </HStack>

      <TextField placeholder='Projekt' field={`project-${idx}`} formik={formik} isReadonly={isReadonly()} />

      <SelectField
        placeholder='Typ'
        options={codeMap}
        field={`code-${idx}`}
        formik={formik}
        valueFormatter={(value) => parseInt(value)}
        isReadonly={isReadonly()}
      />

      <HStack space='md'>
        <Box style={{ flex: 1 }}><TextField placeholder='Stunden' value={getTotalTime(idx)} isReadonly /></Box>
        <Box style={{ flex: 1 }}><TextField placeholder='Stunden total' value={getTotalTime()} isReadonly /></Box>
      </HStack>
    </VStack>
  );

  return (
    <Screen scrollable>
      <HStack justifyContent="space-between" alignItems="center">
        <Button
          icon='caretleft'
          action="secondary"
          w='11%'
          onPress={decreaseDate}
        />

        <DatePicker
          date={formik.values['date']}
          onDateChange={async (date) => await formik.setFieldValue("date", date)}
          androidVariant='nativeAndroid'
          mode='date'
          textColor='#000000'
          locale='de'
          style={{ flex: 1 }}
        />

        <Button
          icon='caretright'
          action="secondary"
          w='11%'
          onPress={increaseDate}
        />
      </HStack>

      <FlatList
        ref={flatListRef}
        data={projectForms}
        keyExtractor={(item) => item.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={{
          paddingRight: 20,
          width: PROJECT_FORM_TOTAL_WIDTH * projectForms.length - 20,
        }}
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        getItemLayout={(_, index) => ({
          length: PROJECT_FORM_TOTAL_WIDTH,
          offset: PROJECT_FORM_TOTAL_WIDTH * index,
          index,
        })}
        renderItem={({ item }) => renderProjectForm(item)}
        onMomentumScrollEnd={({ nativeEvent }) => {
          const index = Math.round(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);

          const isLast = index === projectForms.length - 1;
          const swipeFormFields = ['from', 'to', 'from2', 'to2', 'project', 'code'];
          const hasValues = swipeFormFields.reduce((acc, field) => {
            const key = `${field}-${index}` as keyof typeof formik.values;
            return acc || !!formik.values[key];
          }, false);
          const isMax = index >= workdayFieldLengths.projects.max;

          if (isLast && hasValues && !isMax) addProjectForm();
        }}
        snapToInterval={PROJECT_FORM_TOTAL_WIDTH}
      />

      {!isAdminViewMode && currentTimePicker && (
        <DatePicker
          modal
          open={isTimePickerModalOpen}
          date={getCurrentDate()}
          onConfirm={(date) => {
            setIsTimePickerModalOpen(false);
            onTimeChange(date);
          }}
          onCancel={() => setIsTimePickerModalOpen(false)}
          androidVariant='nativeAndroid'
          mode='time'
          locale='de'
          is24hourSource='device'
        />
      )}

      {!isAdminViewMode && (
        <LoadingButton
          text='Speichern'
          icon='save'
          onPress={formik.submitForm}
          loading={isSaveWorkdayLoading}
          isDisabled={isReadonly()}
        />
      )}
    </Screen>
  );
});
