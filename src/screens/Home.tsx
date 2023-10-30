import React, { useState } from "react";
import { View } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { Text } from "native-base";

interface HomeProps {
  navigation: NavigationProp<any>;
}

export function Home({ navigation }: HomeProps): JSX.Element {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}
