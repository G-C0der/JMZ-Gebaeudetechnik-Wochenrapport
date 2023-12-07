import React from 'react';
import { observer } from "mobx-react-lite";
import { User } from "../types";
import Screen from "./Screen";
import { Text } from "@gluestack-ui/themed";

interface UserWorkStateScreenProps {
  user: User;
}

export default observer(function UserWorkStateScreen({ user }: UserWorkStateScreenProps){
  return (
    <Screen>
      <Text>work state</Text>
    </Screen>
  );
});
