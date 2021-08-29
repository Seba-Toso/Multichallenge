import { useEffect } from 'react';
import { useReducer } from 'react';
import { initialState, HeroReducer } from './services/state';

import {
    Switch,
    Route,
    Redirect,
    useHistory
} from "react-router-dom";

import Home from "./pages/Home";
import Login from './pages/Login'
import FindAHero from './pages/FindAHero'
import HeroDetails from './pages/HeroDetails'

const PrivateRoute = ({user, path, component}) => {
  if(user){
    return <Route path={path} component={component}/>
  }
  else{
    return <Redirect to='/Alkemy_Superhero/access' component={() => <Login/>}/>
  }
}

const SuperHeroRouter = () => {
  const [state, dispatch] = useReducer(HeroReducer, initialState);
  const history = useHistory()
  
  let user = localStorage.getItem('token')

  useEffect(() => {
    if(user){
      dispatch({type: 'LOGGIN'})
      dispatch({type: 'LOGIN_SUCCESS', payload: true})
      history.push('./Alkemy_Superhero')
    }
  },[history, user])

  return (
      <div className="Routes">
        <Switch>
          <Route path='/Alkemy_Superhero/access' component={Login}/>'
          <PrivateRoute user={user} path='/Alkemy_Superhero/hero-detail' component={HeroDetails}/>
          <PrivateRoute user={user} path='/Alkemy_Superhero/find-a-hero' component={FindAHero} />
          <PrivateRoute user={user} path='/Alkemy_Superhero' component={Home}/>
        </Switch>
      </div>
  )
}

export default SuperHeroRouter;
  