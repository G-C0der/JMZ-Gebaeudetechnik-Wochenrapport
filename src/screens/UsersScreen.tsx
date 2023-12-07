import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Screen from "./Screen";
import { useStore } from "../stores";
import { TextField } from "../components/TextField";
import { TouchableOpacity } from "react-native";
import { navigate } from "../services";

export default observer(function UsersScreen() {
  const { adminStore: { users, listUsers, isListUsersLoading } } = useStore();

  useEffect(() => {
    if (!users.length) {
      const fetchUsers = async () => await listUsers();
      fetchUsers();
    }
  }, [users]);

  return (
    <Screen>
      {users.map(user => (
        <TouchableOpacity onPress={() => navigate('Arbeitszeit')}>
          <TextField
            value={`${user.fname} ${user.lname}`}
            readonly
          />
        </TouchableOpacity>
      ))}
    </Screen>
  );
});
