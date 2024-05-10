import { HomePage } from './pages/Home.page';
import { Redirect, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { NotFoundPage } from './pages/NotFound.page';



export default () => {
  let basename = '/'
  return <Router basename={basename} >
    <Switch>
      <Route exact path={"/"} component={HomePage} />
      <Route exact path={"/not-found"} component={NotFoundPage} />
      <Redirect to="/not-found" />
    </Switch>
  </Router>
}
