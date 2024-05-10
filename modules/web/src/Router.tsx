import { HomePage } from './pages/Home.page';
import { Redirect, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { NotFoundPage } from './pages/NotFound.page';
import { redirectLinks, systemModulesList } from './meta/systemModules';



export default () => {
  let basename = '/'

  return <Router basename={basename} >
    <Switch>
      <Route exact path={"/"} component={HomePage} />
      {
        systemModulesList.map(x => {
          return <>
            <Route exact path={`/${x.id}`} component={HomePage} />
            {
              (x.children || []).map(xx => {
                return (
                  <Route exact path={`/${x.id}/${xx.id}`} component={HomePage} />
                )
              })
            }
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
  </Router>
}
