import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { User } from "../types";
import Screen from "./Screen";
import { RouteProp } from "@react-navigation/native";
import { useStore } from "../stores";
import { TextField } from "../components/TextField";
import { StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import CheckBox from "../components/CheckBox";
import { HStack, Text } from "@gluestack-ui/themed";
import { LoadingButton } from "../components/LoadingButton";
import PopUpDialog from "../components/PopUpDialog";

interface UserWorkStateScreenParams {
  user: User;
}

interface UserWorkStateScreenProps {
  route: RouteProp<{ params: UserWorkStateScreenParams }, 'params'>;
}

export default observer(function UserWorkStateScreen({ route }: UserWorkStateScreenProps){
  const { user } = route.params;

  const {
    adminStore: { userWorkweeks, listWorkweeks, isListWorkweeksLoading, approveWorkweeks, isApproveWorkweekLoading }
  } = useStore();

  const [workweekCheckboxStates, setWorkweekCheckboxStates] = useState({});
  const [isApprovalPopUpDialogOpen, setIsApprovalPopUpDialogOpen] = useState(false);

  useEffect(() => {
    if (!userWorkweeks.length || (userWorkweeks.length && userWorkweeks[0].userId !== user.id)) {
      const fetchWorkweeks = async () => await listWorkweeks(user.id);
      fetchWorkweeks();
    }
  }, [userWorkweeks]);

  const handleCheckboxChange = (workweekId: number, isChecked: boolean) => {
    setWorkweekCheckboxStates({ ...workweekCheckboxStates, [workweekId]: isChecked });
  };

  const handleApproveClick = async () => {
    const workweekIds = Object.keys(Object.fromEntries(Object.entries(workweekCheckboxStates).filter(([_, state]) => state))).map(Number);
    await approveWorkweeks(workweekIds);
  };

  return (
    <Screen>
      <Text style={styles.userName}>{user.fname} {user.lname}</Text>

      {userWorkweeks.map(workweek => (
        <HStack space='md'>
          <TouchableOpacity
            key={workweek.id}
            onPress={() => {}}
            style={{ flex: 1 }}
          >
            <TextField
              value={`${moment(workweek.start).format('DD.MM.')} - ${moment(workweek.end).format('DD.MM.')}`}
              isReadOnly
            />
          </TouchableOpacity>
          <CheckBox
            value={workweekCheckboxStates[workweek.id] || false}
            onChange={(isChecked: boolean) => handleCheckboxChange(workweek.id, isChecked)}
          />
        </HStack>
      ))}

      <LoadingButton
        text='Bewilligen'
        icon='checkcircleo'
        onPress={() => setIsApprovalPopUpDialogOpen(true)}
        loading={isApproveWorkweekLoading}
      />
      <PopUpDialog
        isOpen={isApprovalPopUpDialogOpen}
        setIsOpen={setIsApprovalPopUpDialogOpen}
        title='Bestätigung'
        text='Möchtest du die selektierten Arbeitswochen bewilligen?'
        actionButtonText='Bewilligen'
        callback={handleApproveClick}
      />
    </Screen>
  );
});

const styles = StyleSheet.create({
  userName: {
    fontWeight: "bold",
    textAlign: "center"
  }
});
