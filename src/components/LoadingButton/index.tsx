import React from 'react';
import { ButtonSpinner } from "@gluestack-ui/themed";
import Button, { ButtonProps } from "../Button";
import { appColorTheme } from "../../config/env";

interface LoadingButtonProps extends ButtonProps  {
  loading: boolean;
  [key: string]: any;
}

export function LoadingButton({ text, loading, icon, ...props }: LoadingButtonProps) {
  return (
    <Button
      bg="$lightBlue600"
      {...props}
      text={loading ? 'Laden...' : text}
      icon={loading ? <ButtonSpinner /> : icon}
      isDisabled={loading}
      style={{ backgroundColor: appColorTheme }}
    />
  );
}
