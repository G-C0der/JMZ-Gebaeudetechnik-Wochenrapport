import React from 'react';
import { Menu, MenuItem, Icon, MenuItemLabel, PhoneIcon } from "@gluestack-ui/themed";
import Button from '../Button';

export default function() {
  return (
    <Menu
      placement="bottom right"
      offset={0}
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
      <MenuItem key="Community" textValue="Community">
        <Icon as={PhoneIcon} size="sm" mr='$2'/>
        <MenuItemLabel size='sm'>
          Community
        </MenuItemLabel>
      </MenuItem>
      <MenuItem key="Plugins" textValue="Plugins">
        {/* PuzzleIcon is imported from 'lucide-react-native' */}
        <Icon as={PhoneIcon} size="sm" mr='$2'/>
        <MenuItemLabel size='sm'>
          Plugins
        </MenuItemLabel>
      </MenuItem>
      <MenuItem key="Theme" textValue="Theme">
        {/* PaintBucket is imported from 'lucide-react-native' */}
        <Icon as={PhoneIcon} size="sm" mr='$2'/>
        <MenuItemLabel size='sm'>
          Theme
        </MenuItemLabel>
      </MenuItem>
      <MenuItem key="Settings" textValue="Settings">
        <Icon as={PhoneIcon} size="sm" mr='$2'/>
        <MenuItemLabel size='sm'>
          Settings
        </MenuItemLabel>
      </MenuItem>
      <MenuItem key="Add account" textValue="Add account">
        <Icon as={PhoneIcon} size="sm" mr='$2'/>
        <MenuItemLabel size='sm'>
          Add account
        </MenuItemLabel>
      </MenuItem>
    </Menu>
  );
}
