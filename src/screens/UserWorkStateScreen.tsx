import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { User } from "../types";
import Screen from "./Screen";
import { RouteProp } from "@react-navigation/native";
import { useStore } from "../stores";
import { TextField } from "../components/TextField";
import { TouchableOpacity } from "react-native";
import moment from "moment";
import CheckBox from "../components/CheckBox";
import { HStack } from "@gluestack-ui/themed";
import { LoadingButton } from "../components/LoadingButton";

interface UserWorkStateScreenParams {
  user: User;
}

interface UserWorkStateScreenProps {
  route: RouteProp<{ params: UserWorkStateScreenParams }, 'params'>;
}

export default observer(function UserWorkStateScreen({ route }: UserWorkStateScreenProps){
  const { user } = route.params;

  const {
    adminStore: { userWorkweeks, listWorkweeks, isListWorkweeksLoading, approveWorkweek, isApproveWorkweekLoading }
  } = useStore();

  const [checkboxStates, setCheckboxStates] = useState({});

  useEffect(() => {
    if (!userWorkweeks.length || (userWorkweeks.length && userWorkweeks[0].userId !== user.id)) {
      const fetchWorkweeks = async () => await listWorkweeks(user.id);
      fetchWorkweeks();
    }
  }, [userWorkweeks]);

  const handleCheckboxChange = (workweekId: number, isChecked: boolean) => {
    setCheckboxStates({ ...checkboxStates, [workweekId]: isChecked });
  };

  const handleApproveClick = async () => {
    console.log('checkboxes', checkboxStates)
  };

  return (
    <Screen>
      {userWorkweeks.map(workweek => (
        <HStack space='md'>
          <TouchableOpacity
            key={workweek.id}
            onPress={() => {}}
            style={{ flex: 1 }}
          >
            <TextField
              value={`${moment(workweek.start).format('DD.MM.')} - ${moment(workweek.end).format('DD.MM.')}`}
              readonly
            />
          </TouchableOpacity>
          <CheckBox
            value={checkboxStates[workweek.id] || false}
            onChange={(isChecked: boolean) => handleCheckboxChange(workweek.id, isChecked)}
          />
        </HStack>
      ))}

      <LoadingButton
        text='Bewilligen'
        icon='checkcircleo'
        onPress={handleApproveClick}
        loading={isApproveWorkweekLoading}
      />
    </Screen>
  );
});
