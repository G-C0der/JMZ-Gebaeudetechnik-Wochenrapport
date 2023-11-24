import React from 'react';
import { Button, ButtonSpinner, ButtonText } from "@gluestack-ui/themed";
import AntDesign from 'react-native-vector-icons/AntDesign';

interface LoadingButtonProps {
  text: string;
  onPress: () => unknown;
  loading: boolean;
  icon?: string;
  [key: string]: any;
}

export function LoadingButton({ onPress, text, loading, icon, ...props }: LoadingButtonProps) {
  return (
    <Button onPress={onPress} isDisabled={loading} bg="$lightBlue600" {...props}>
      {loading ? <ButtonSpinner /> : <AntDesign name={icon} size={20} />}
      <ButtonText ml='$1' fontWeight="$medium" fontSize="$sm">
        {loading ? 'Laden...' : text}
      </ButtonText>
    </Button>
  );
}
