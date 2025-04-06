import React from 'react';
import { SafeAreaView, StyleSheet } from "react-native";
import { Text } from "@gluestack-ui/themed";
import Menu from "../components/Menu";
import { navigate, navigationRef } from "../services";
import { useStore } from "../stores";
import { appColorTheme } from "../config/env";
import { shortenString } from "../utils";
import { User } from "../types";

interface ScreenHeaderProps {
  title: string;
}

export default function ScreenHeader({ title }: ScreenHeaderProps) {
  const { userStore: { logout, user } } = useStore();

  const shortenName = (name?: string)  => {
    if (!name) return;

    return shortenString(name, ' ').toUpperCase();
  };

  const getCurrentRouteName = () => navigationRef.isReady() && navigationRef.getCurrentRoute()?.name;
  const getCurrentUserName = () => {
    const userParam = navigationRef.isReady() && navigationRef.getCurrentRoute()?.params as { user?: User };
    return userParam
      ? `${userParam.user?.fname} ${shortenName(userParam.user?.lname)}`
      : `${user?.fname} ${shortenName(user?.lname)}`;
  };

  const getMenuOptions = () => {
    const options = [
      {
        icon: 'calendar',
        text: 'Rapport',
        onPress: () => navigate('reportScreen'),
        condition: getCurrentRouteName() !== 'reportScreen'
      },
      {
        icon: 'addusergroup',
        text: 'Mitarbeiter',
        onPress: () => navigate('usersScreen'),
        condition: getCurrentRouteName() !== 'usersScreen' && user?.admin
      },
      {
        icon: 'logout',
        text: 'Ausloggen',
        onPress: logout
      }
    ];

    return options.filter(option => option.condition !== false);
  };

  return (
    <SafeAreaView style={styles.headerContainer}>
      <Text style={styles.userName}>{getCurrentUserName()}</Text>
      <Text style={styles.headerTitle}>{title}</Text>
      <Menu options={getMenuOptions()} />
    </SafeAreaView>
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
