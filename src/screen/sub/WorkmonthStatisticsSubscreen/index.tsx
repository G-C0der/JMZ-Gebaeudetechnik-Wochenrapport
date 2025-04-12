import React from 'react';
import { Text, VStack } from "@gluestack-ui/themed";
import MonthPicker from "../../../components/Picker/MonthPicker";
import { useStore } from "../../../stores";

export default function WorkmonthStatisticsSubscreen() {
  const { adminStore: { setMonth } } = useStore();

  return (
    <VStack space='md'>
      <MonthPicker onChange={setMonth} />

      <Text>...</Text>
      <Text>...</Text>
      <Text>...</Text>
      <Text>...</Text>
    </VStack>
  );
}
