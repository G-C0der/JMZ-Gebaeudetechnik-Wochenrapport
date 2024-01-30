import React from 'react';
import { StyleSheet, View } from "react-native";
import { Text } from "@gluestack-ui/themed";
import Menu from "../components/Menu";
import { navigate } from "../services";
import { useStore } from "../stores";
import { appColorTheme } from "../config/env";

interface ScreenHeaderProps {
  title: string;
}

export default function ScreenHeader({ title }: ScreenHeaderProps) {
  const { userStore: { logout, user } } = useStore();

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.userName}>{`${user?.fname} ${user?.lname?.slice(0, 1)}.`}</Text>
      <Text style={styles.headerTitle}>{title}</Text>
        <Menu options={[
          { icon: 'calendar', text: 'Rapport', onPress: () => navigate('reportScreen') },
          { icon: 'addusergroup', text: 'Mitarbeiter', onPress: () => navigate('usersScreen') },
          { icon: 'logout', text: 'Ausloggen', onPress: logout }
        ]} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: appColorTheme,
    padding: 2
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  userName: {
    marginLeft: 20
  }
});
