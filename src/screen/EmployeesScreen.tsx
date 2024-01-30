import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Screen from "./Screen";
import { useStore } from "../stores";
import { TextField } from "../components/TextField";
import { TouchableOpacity } from "react-native";
import { navigate } from "../services";

export default observer(function UsersScreen() {
  const { adminStore: { employees, listUsers, isListUsersLoading } } = useStore();

  useEffect(() => {
    if (!employees.length) {
      const fetchUsers = async () => await listUsers();
      fetchUsers();
    }
  }, [users]);

  return (
    <Screen>
      {employees.map(employee => (
        <TouchableOpacity
          key={employee.id}
          onPress={() => navigate('workStateScreen', { employee })}
        >
          <TextField
            value={`${employee.fname} ${employee.lname}`}
            readonly
          />
        </TouchableOpacity>
      ))}
    </Screen>
  );
});
