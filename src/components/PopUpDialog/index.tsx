import React from 'react';
import {
  AlertDialog,
  AlertDialogBackdrop, AlertDialogBody, AlertDialogCloseButton,
  AlertDialogContent, AlertDialogFooter,
  AlertDialogHeader, ButtonGroup,
  Center, CloseIcon,
  Heading, Icon, Text
} from "@gluestack-ui/themed";
import Button from '../Button';

interface PopUpDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  text: string;
  actionButtonText: string;
  callback: () => unknown;
}

export default function PopUpDialog({ isOpen, setIsOpen, title, text, actionButtonText, callback }: PopUpDialogProps) {
  return (
    <Center h={300}>
      <AlertDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg">{title}</Heading>
            <AlertDialogCloseButton>
              <Icon as={CloseIcon} />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm">{text}</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup space="lg">
              <Button
                text='Abbrechen'
                variant="outline"
                action="secondary"
                bg="$grey"
                pr='$2' pl='$1'
                onPress={() => setIsOpen(false)}
              />
              <Button
                text={actionButtonText}
                action="positive"
                pr='$2' pl='$1'
                onPress={() => {
                  callback();
                  setIsOpen(false);
                }}
              />
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Center>
  );
}
