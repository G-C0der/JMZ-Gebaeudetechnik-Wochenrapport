import React from 'react';
import AntDesign from "react-native-vector-icons/AntDesign";

interface IconProps {
  name?: string;
  size?: number;
  color?: string;
}

export default function Icon({ name, size = 20, color = '#fff' }: IconProps) {
  return (
    <AntDesign name={name} size={size} style={{ color }} />
  );
}
