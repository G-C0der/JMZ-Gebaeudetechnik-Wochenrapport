import React, { useEffect, useState } from "react";
import { UserWorkweekApprovalStates } from "./types";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores";
import { TextField } from "../../../components/TextField";
import { StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import CheckBox from "../../../components/CheckBox";
import { Box, HStack, ScrollView, VStack } from "@gluestack-ui/themed";
import { LoadingButton } from "../../../components/LoadingButton";
import PopUpDialog from "../../../components/PopUpDialog";
import Spinner from '../../../components/Spinner';
import { getScreenHeight } from "../../utils";
import { User } from "../../../types";
import { navigate } from "../../../services";

interface WorkweekApprovalSubscreenProps {
  user: User;
}

export default observer(function WorkweekApprovalSubscreen({ user }: WorkweekApprovalSubscreenProps){
  const {
    adminStore: {
      listWorkweeks,
      clearWorkweeks,
      userWorkweeks,
      isListWorkweeksLoading,
      approveWorkweeks,
      isApproveWorkweekLoading
    }
  } = useStore();

  const [workweekCheckboxStates, setWorkweekCheckboxStates] = useState<UserWorkweekApprovalStates>({});
  const [isApprovalPopUpDialogOpen, setIsApprovalPopUpDialogOpen] = useState(false);

  const spinnerMinHeight = getScreenHeight() * 0.27;

  useEffect(() => {
    return () => clearWorkweeks();
  }, []);

  useEffect(() => {
    if (!userWorkweeks.length) {
      const fetchWorkweeks = async () => await listWorkweeks(user.id);
      fetchWorkweeks();
    } else {
      const userWorkweekApprovalStates: UserWorkweekApprovalStates = {};
      for (const userWorkweek of userWorkweeks) {
        userWorkweekApprovalStates[userWorkweek.id] = {
          approved: userWorkweek.approved,
          readonly: userWorkweek.approved
        };
      }
      setWorkweekCheckboxStates({ ...workweekCheckboxStates, ...userWorkweekApprovalStates });
    }
  }, [userWorkweeks]);

  const handleCheckboxChange = (workweekId: number, isChecked: boolean) => {
    setWorkweekCheckboxStates({ ...workweekCheckboxStates, [workweekId]: { approved: isChecked, readonly: false } });
  };

  const handleApproveClick = async () => {
    const approvedPendingWorkweekIds = Object.keys(Object.fromEntries(
      Object.entries(workweekCheckboxStates).filter(([, { approved, readonly }]) => approved && !readonly))
    ).map(Number);
    await approveWorkweeks(approvedPendingWorkweekIds);
  };

  const isAPendingWorkweekCheckboxChecked = () => !!Object.entries(workweekCheckboxStates)
    .find(([, { approved, readonly }]) => approved && !readonly);

  return (
    <VStack space='md'>
      <ScrollView style={styles.workweeksContainer}>
        {isListWorkweeksLoading ? (
          <Spinner style={{ minHeight: spinnerMinHeight }} />
        ) : (
          <Box gap={12}>
            {userWorkweeks.map(workweek => (
              <HStack key={workweek.id} space='md'>
                <TouchableOpacity
                  onPress={() => navigate('reportScreen', { user })}
                  style={{ flex: 1 }}
                >
                  <TextField
                    value={`${moment(workweek.start).format('DD.MM.')} - ${moment(workweek.end).format('DD.MM.')}`}
                    isReadonly
                  />
                </TouchableOpacity>
                <CheckBox
                  value={workweekCheckboxStates[workweek.id]?.approved || false}
                  onChange={(isChecked: boolean) => handleCheckboxChange(workweek.id, isChecked)}
                  isDisabled={user.admin}
                  isReadonly={workweekCheckboxStates[workweek.id]?.readonly}
                />
              </HStack>
            ))}
          </Box>
        )}
      </ScrollView>
      <LoadingButton
        text='Bewilligen'
        icon='checkcircleo'
        onPress={() => setIsApprovalPopUpDialogOpen(true)}
        loading={isApproveWorkweekLoading}
        isDisabled={user.admin || !isAPendingWorkweekCheckboxChecked()}
      />
      <PopUpDialog
        isOpen={isApprovalPopUpDialogOpen}
        setIsOpen={setIsApprovalPopUpDialogOpen}
        title='Bestätigung'
        text='Möchtest du die selektierten Arbeitswochen bewilligen?'
        actionButtonText='Bewilligen'
        callback={handleApproveClick}
      />
    </VStack>
  );
});

const styles = StyleSheet.create({
  workweeksContainer: {
    height: '33%',
    overflow: "scroll"
  }
});
