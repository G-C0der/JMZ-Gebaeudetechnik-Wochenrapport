import React from 'react';
import { Menu, MenuItem, MenuItemLabel } from "@gluestack-ui/themed";
import Icon from '../Icon';
import Button from '../Button';

interface MenuProps {
  options: { icon: string, text: string, onPress: () => void }[];
}

export default function({ options }: MenuProps) {
  return (
    <Menu
      ml='$20'
      mt='$10'
      trigger={({ ...triggerProps }) => {
        const { 'aria-expanded': isOpen } = triggerProps;
        return (
          <Button
            icon={isOpen ? 'menu-unfold' : 'menu-fold'}
            iconSize={23}
            contentColor='#000'
            bg='transparent'
            w='25%'
            {...triggerProps}
          />
        );
      }}
    >
      {options.map(({ icon, text, onPress }) => (
        <MenuItem key={text} onPress={onPress}>
          <Icon name={icon} color='#000' />
          <MenuItemLabel size='sm' ml='$1'>
            {text}
          </MenuItemLabel>
        </MenuItem>
      ))}
    </Menu>
  );
}
