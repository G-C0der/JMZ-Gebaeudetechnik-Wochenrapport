import { Box, HStack } from "@gluestack-ui/themed";
import Button from "../Button";
import { TextField } from "../TextField";

interface PickerProps {
  value: any;
  handleLeftClick: () => void;
  handleRightClick: () => void;
  widthPercent: number;
}

const Picker = ({ value, handleLeftClick, handleRightClick, widthPercent }: PickerProps) => (
  <HStack justifyContent="space-between" alignItems="center">
    <Button
      icon='caretleft'
      action="secondary"
      w='11%'
      onPress={handleLeftClick}
    />

    <Box flexBasis={`${widthPercent}%`}>
      <TextField
        value={String(value)}
        isReadonly
        style={{ textAlign: 'center' }}
      />
    </Box>

    <Button
      icon='caretright'
      action="secondary"
      w='11%'
      onPress={handleRightClick}
    />
  </HStack>
);

export default Picker;
