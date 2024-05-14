import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import './global.css'
import { Provider, useDispatch } from "react-redux";
import { store, RootState } from "./store/index";
import { Toaster, toast } from 'sonner'
import Router from './Router';

export default function App() {
  return (
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <Toaster richColors />
        <Router />
      </MantineProvider>
    </Provider>
  );
}
