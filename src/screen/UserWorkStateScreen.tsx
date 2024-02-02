import React from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../services";
import WorkweekApprovalSubscreen from "./sub/WorkweekApprovalSubscreen";
import Screen from "./Screen";
import { Text } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";

interface UserWorkStateScreenProps {
  route: RouteProp<RootStackParamList, 'workStateScreen'>;
}

export default function UserWorkStateScreen({ route }: UserWorkStateScreenProps) {
  const { user } = route.params;

  return (
    <Screen>
      <Text style={styles.userName}>{user.fname} {user.lname}</Text>

      <WorkweekApprovalSubscreen user={user} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  userName: {
    fontWeight: "bold",
    textAlign: "center"
  }
});
