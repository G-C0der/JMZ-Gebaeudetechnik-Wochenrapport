import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { User } from "../types";
import Screen from "./Screen";
import { RouteProp } from "@react-navigation/native";
import { useStore } from "../stores";
import { TextField } from "../components/TextField";
import { TouchableOpacity } from "react-native";
import moment from "moment";

interface UserWorkStateScreenParams {
  user: User;
}

interface UserWorkStateScreenProps {
  route: RouteProp<{ params: UserWorkStateScreenParams }, 'params'>;
}

export default observer(function UserWorkStateScreen({ route }: UserWorkStateScreenProps){
  const { user } = route.params;

  const { adminStore: { userWorkweeks, listWorkweeks, isListWorkweeksLoading } } = useStore();

  useEffect(() => {
    if (!userWorkweeks.length || (userWorkweeks.length && userWorkweeks[0].userId !== user.id)) {
      const fetchWorkweeks = async () => await listWorkweeks(user.id);
      fetchWorkweeks();
    }
  }, [userWorkweeks]);

  return (
    <Screen>
      {userWorkweeks.map(workweek => (
        <TouchableOpacity
          key={workweek.id}
          onPress={() => {}}
        >
          <TextField
            value={`${moment(workweek.start).format('DD.MM.')} - ${moment(workweek.end).format('DD.MM.')}`}
            readonly
          />
        </TouchableOpacity>
      ))}
    </Screen>
  );
});
