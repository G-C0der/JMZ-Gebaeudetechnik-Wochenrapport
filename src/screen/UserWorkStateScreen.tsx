import React from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../services";
import WorkweekApprovalSubscreen from "./sub/WorkweekApprovalSubscreen";
import Screen from "./Screen";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import WorkmonthStatisticsSubscreen from "./sub/WorkmonthStatisticsSubscreen";

interface UserWorkStateScreenProps {
  route: RouteProp<RootStackParamList, 'workStateScreen'>;
}

export default function UserWorkStateScreen({ route }: UserWorkStateScreenProps) {
  const { user } = route.params;

  return (
    <Screen>
      <Text style={styles.userName}>{user.fname} {user.lname}</Text>

      <WorkweekApprovalSubscreen user={user} />
      {/*<VStack space='md' style={{ flex: 1 }}>*/}
      {/*  <Box style={{ flex: 1 }}>*/}
      {/*    <WorkweekApprovalSubscreen user={user} />*/}
      {/*  </Box>*/}
      {/*  <Box style={{ flex: 1 }}>*/}
      {/*    <WorkmonthStatisticsSubscreen />*/}
      {/*  </Box>*/}
      {/*</VStack>*/}
    </Screen>
  );
}

const styles = StyleSheet.create({
  userName: {
    fontWeight: "bold",
    textAlign: "center"
  }
});
