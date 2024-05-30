import { HomePage } from './pages/Home.page';
import { Redirect, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { NotFoundPage } from './pages/NotFound.page';
import { redirectLinks, systemModulesList } from './systemModules';
import { useEffect } from 'react';
import _ from 'lodash';
import { FN_GetDispatch } from './store/nocycle';
import apiSlice from './store/reducers/apiSlice';
import UsersSlice from './store/reducers/userSlice';
import SystemAlertOrPrompt from './containers/SystemAlertOrPrompt';
import exportUtils from './utils/ExportUtils';
import { SetupPage } from './pages/Setup.page';



export default () => {
  let basename = '/'
  const userInfoMeta = apiSlice.useGetUserInfoQuery({
    initCount: exportUtils.useSelector(v => v.settings.initCount)
  }, {
    refetchOnMountOrArgChange: true
  })
  useEffect(() => {
    const userInfoData = userInfoMeta.data?.data
    if (userInfoData) {
      FN_GetDispatch()(
        UsersSlice.actions.updateOneOfParamState({
          userInfo: userInfoData
        })
      )
    }
  }, [userInfoMeta.status])
  const routerArr:JSX.Element[] = []
  for(let x of systemModulesList){
    x.children?.map((y, yi) => {
      const optPath = `/${x.id}/${y.id}`
      routerArr.push(<Route key={yi + x.id + y.id+'2'} exact path={`/${x.id}`} component={HomePage} />)
      routerArr.push(<Route key={yi + x.id + y.id} exact path={optPath} component={HomePage} />)
      routerArr.push(<Route key={yi + x.id + y.id} exact path={optPath+'/:extId'} component={HomePage} />)
    })
  }
  return <Router basename={basename} >
    <Switch>
      <Route exact path={"/not-found"} component={NotFoundPage} />
      <Route exact path={"/"} component={HomePage} />
      <Route exact path={"/setup"} component={SetupPage} />
      {routerArr}
      {
        redirectLinks.map(x => {
          return (
            <Redirect exact key={x.path} path={x.path} to={x.url} />
          )
        })
      }
      <Redirect to="/not-found" />
    </Switch>
    <SystemAlertOrPrompt />
  </Router>
}
