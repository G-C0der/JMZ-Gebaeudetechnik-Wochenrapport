import React from 'react';
import { Button, ButtonText } from "@gluestack-ui/themed";
import Icon from "../Icon";

export interface ButtonProps {
  text?: string;
  icon?: string | React.ReactNode;
  [key: string]: any;
}

export default function({ icon, text, ...props }: ButtonProps) {
  return (
    <Button
      pr='$0' pl='$0' // Ensures content is visible on small button width
      {...props}
    >
      {typeof icon === 'string' ? <Icon name={icon} /> : icon}
      {text && (
        <ButtonText ml='$1' fontWeight="$medium" fontSize="$sm">
          {text}
        </ButtonText>
      )}
    </Button>
  );
}
