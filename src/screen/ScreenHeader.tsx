import React from 'react';
import { StyleSheet, View } from "react-native";
import { Text } from "@gluestack-ui/themed";
import Menu from "../components/Menu";
import { navigate } from "../services";
import { useStore } from "../stores";

export default function ScreenHeader() {
  const { userStore: { logout, user } } = useStore();

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Rapport</Text>

      <Text style={styles.userName}>{`${user?.fname} ${user?.lname?.slice(0, 1)}.`}</Text>

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
    backgroundColor: '#fff'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    // You can adjust the margin to position the text as you like
  },
  userName: {
    // Style for the user name text
  },
});
