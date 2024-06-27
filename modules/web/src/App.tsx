import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import './global.css'
import { Provider, useDispatch } from "react-redux";
import { store, RootState } from "./store/index";
import { Toaster, toast } from 'sonner'
import AppRouter from './Router';
import { useDocumentTitle } from '@mantine/hooks';
import GetAppInfo from './AppInfo';


export default function App() {

  return (
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <AppRouter />
      </MantineProvider>
    </Provider>
  );


}
