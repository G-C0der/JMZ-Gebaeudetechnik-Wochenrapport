import React from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../services";
import WorkweekApprovalSubscreen from "./sub/WorkweekApprovalSubscreen";
import Screen from "./Screen";
import WorkmonthStatisticsSubscreen from "./sub/WorkmonthStatisticsSubscreen";
import YearPicker from "../components/Picker/YearPicker";
import { useStore } from "../stores";

interface UserWorkStateScreenProps {
  route: RouteProp<RootStackParamList, 'workStateScreen'>;
}

export default function UserWorkStateScreen({ route }: UserWorkStateScreenProps) {
  const { user } = route.params;
  const { adminStore: { setYear } } = useStore();

  return (
    <Screen>
      {/*<Text style={styles.userName}>{user.fname} {user.lname}</Text>*/}

      <YearPicker onChange={setYear} />

      <WorkweekApprovalSubscreen user={user}>
        <WorkmonthStatisticsSubscreen />
      </WorkweekApprovalSubscreen>
    </Screen>
  );
}

// const styles = StyleSheet.create({
//   userName: {
//     fontWeight: "bold",
//     textAlign: "center"
//   }
// });
