import React, { useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { View, Text } from "native-base";

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
