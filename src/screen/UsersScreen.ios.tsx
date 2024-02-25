import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Screen from "./Screen";
import { useStore } from "../stores";
import { TextField } from "../components/TextField";
import { StyleSheet, TouchableOpacity } from "react-native";
import { navigate } from "../services";
import Spinner from '../components/Spinner';
import { getScreenHeight } from "./utils";
import { Box } from "@gluestack-ui/themed";

export default observer(function UsersScreen() {
  const { adminStore: { users, listUsers, isListUsersLoading } } = useStore();

  const spinnerMinHeight = getScreenHeight() * 0.82;

  useEffect(() => {
    if (!users.length) {
      const fetchUsers = async () => await listUsers();
      fetchUsers();
    }
  }, [users]);

  return (
    <Screen scrollable>
      {isListUsersLoading ? (
        <Spinner style={{ minHeight: spinnerMinHeight }} />
      ) : (
        <>
          {users.map(user => (
            <Box style={styles.textFieldContainer}>
              <TextField
                value={`${user.fname} ${user.lname}`}
                isReadonly
              />
              <TouchableOpacity
                key={user.id}
                style={styles.overlayTouchable}
                onPress={() => navigate('workStateScreen', { user })}
              />
            </Box>
          ))}
        </>
      )}
    </Screen>
  );
});

const styles = StyleSheet.create({
  textFieldContainer: {
    flex: 1,
  },
  overlayTouchable: {
    ...StyleSheet.absoluteFillObject, // This will make the touchable cover the entire area of the container
    backgroundColor: 'transparent', // Ensure the touchable is transparent
  },
});
