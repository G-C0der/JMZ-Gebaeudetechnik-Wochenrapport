import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Screen from "./Screen";
import { useStore } from "../stores";
import { TextField } from "../components/TextField";
import { TouchableOpacity } from "react-native";

export default observer(function EmployeesScreen() {
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
        <TouchableOpacity onPress={() => {}}>
          <TextField
            value={`${user.fname} ${user.lname}`}
            readonly
          />
        </TouchableOpacity>
      ))}
    </Screen>
  );
});
