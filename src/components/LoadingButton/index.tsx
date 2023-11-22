import React from 'react';
import { Button, ButtonSpinner, ButtonText } from "@gluestack-ui/themed";

interface LoadingButtonProps {
  text: string;
  onPress: () => unknown;
  loading: boolean;
  [key: string]: any;
}

export function LoadingButton({ onPress, text, loading, ...props }: LoadingButtonProps) {
  return (
    <Button onPress={onPress} isDisabled={loading} bg="$lightBlue600" {...props}>
      {loading && <ButtonSpinner mr="$1" />}
      <ButtonText fontWeight="$medium" fontSize="$sm">
        {loading ? 'Laden...' : text}
      </ButtonText>
    </Button>
  );
}
