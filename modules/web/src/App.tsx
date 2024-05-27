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
  if (GetAppInfo().needDoBeiAn && !GetAppInfo().isInMdgjxCOM) {
    useDocumentTitle(location.href.indexOf('laftools.cn') != -1 ? 'LafTools在线工具箱' : 'LafTools程序员工具箱')
  }
  return (
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <AppRouter />
      </MantineProvider>
    </Provider>
  );
}
