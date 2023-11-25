import { ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
  warning: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderColor: 'orange' }}
    />
  )
};
