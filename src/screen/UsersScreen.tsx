import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Screen from "./Screen";
import { useStore } from "../stores";
import { TextField } from "../components/TextField";
import { TouchableOpacity } from "react-native";
import { navigate } from "../services";
import Spinner from '../components/Spinner';
import { getScreenHeight } from "./utils";

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
            <TouchableOpacity
              key={user.id}
              onPress={() => navigate('workStateScreen', { user })}
            >
              <TextField
                value={`${user.fname} ${user.lname}`}
                isReadonly
              />
            </TouchableOpacity>
          ))}
        </>
      )}
    </Screen>
  );
});
