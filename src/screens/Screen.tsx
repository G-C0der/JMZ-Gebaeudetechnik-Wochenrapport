import React, { useEffect } from "react";
import { useStore } from "../stores";
import { SafeAreaView } from "react-native";
import { ScrollView, Box, VStack } from "@gluestack-ui/themed";
import { observer } from "mobx-react-lite";

interface MainScreenProps {
  scrollable?: boolean;
  children: React.ReactNode;
}

export default observer(function Screen({ scrollable, children }: MainScreenProps) {
  const { userStore: { isLoggedIn, token, tokenExpiration, user } } = useStore();


  console.log('isLoggedIn',isLoggedIn)
  console.log('isLoggedInval',isLoggedIn())
  console.log('token',token)
  console.log('tokenExpiration',tokenExpiration)
  console.log('tokenExpirationdate',new Date(tokenExpiration))
  console.log('user',user)

  const node = (
    <Box padding={20}>
      <VStack space='md'>
        {children}
      </VStack>
    </Box>
  );

  return (
    <SafeAreaView>
      {scrollable ? (
        <ScrollView>
          {node}
        </ScrollView>
      ): node}
    </SafeAreaView>
  );
})
