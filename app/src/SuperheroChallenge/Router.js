import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
  
  import Home from "./pages/Home";
  import Login from './pages/Login'
  import FindAHero from './pages/FindAHero'
  
  const PrivateRoute = ({path, component}) => {
    const user = true

    if(user){
      return <Route path={path} component={component}/>
    }
    else{
      return <Redirect to='/Alkemy_Superhero/access' component={() => <Login/>}/>
    }
  }

  const SuperHeroRouter = () => {
    return (
        <div className="Routes">
          <Switch>
            <Route path='/Alkemy_Superhero/access' component={Login}/>'
            <PrivateRoute path='/Alkemy_Superhero/find-a-hero' component={FindAHero}/>
            <PrivateRoute path='/Alkemy_Superhero' component={Home}/>
          </Switch>
        </div>
    )
  }
  
  export default SuperHeroRouter;
  