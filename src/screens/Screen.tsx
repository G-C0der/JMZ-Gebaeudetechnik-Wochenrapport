import React from 'react';
import { useStore } from "../stores";
import { SafeAreaView } from "react-native";
import { ScrollView, Box, VStack } from "@gluestack-ui/themed";

interface MainScreenProps {
  scrollable?: boolean;
  children: React.ReactNode;
}

export default function Screen({ scrollable, children }: MainScreenProps) {
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
}
