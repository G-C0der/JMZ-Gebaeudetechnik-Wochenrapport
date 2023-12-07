import React from 'react';
import { observer } from "mobx-react-lite";
import { User } from "../types";
import Screen from "./Screen";
import { Text } from "@gluestack-ui/themed";
import { RouteProp } from "@react-navigation/native";

interface UserWorkStateScreenParams {
  user: User;
}

interface UserWorkStateScreenProps {
  route: RouteProp<{ params: UserWorkStateScreenParams }, 'params'>;
}

export default observer(function UserWorkStateScreen({ route }: UserWorkStateScreenProps){
  const user = route.params;

  return (
    <Screen>
      <Text>user = {JSON.stringify(user)}</Text>
    </Screen>
  );
});
