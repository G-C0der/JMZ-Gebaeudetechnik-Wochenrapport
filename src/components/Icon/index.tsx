import React from 'react';
import AntDesign from "react-native-vector-icons/AntDesign";

interface IconProps {
  name?: string;
  size?: number;
}

export default function Icon({ name, size = 20 }: IconProps) {
  return (
    <AntDesign name={name} size={size} />
  );
}
