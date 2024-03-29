import React from 'react';
import { Spinner as Loader } from "@gluestack-ui/themed";

interface SpinnerProps {
  [key: string]: any;
}

export default function Spinner({ ...props }: SpinnerProps) {
  const { style, ...otherProps } = props;

  return (
    <Loader
      size="large"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        ...style
      }}
      {...otherProps}
    />
  );
}
