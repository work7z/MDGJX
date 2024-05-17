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



export default () => {
  let basename = '/'
  const [t_userInfo] = apiSlice.useLazyGetUserInfoQuery()
  useEffect(() => {
    t_userInfo({}).then(x => {
      if (x.data && x.data.data) {
        FN_GetDispatch()(
          UsersSlice.actions.updateOneOfParamState({
            userInfo: x.data.data
          })
        )
      }
    })
  }, [t_userInfo])

  return <Router basename={basename} >
    <Switch>
      <Route exact path={""} component={HomePage} />
      {
        systemModulesList.map(x => {
          return <>
            <Route exact path={`/${x.id}/:subId`} component={HomePage} />
          </>
        })
      }
      <Route exact path={"/not-found"} component={NotFoundPage} />
      {
        redirectLinks.map(x => {
          return (
            <Redirect exact path={x.path} to={x.url} />
          )
        })
      }
      <Redirect to="/not-found" />
    </Switch>
    <SystemAlertOrPrompt />
  </Router>
}
