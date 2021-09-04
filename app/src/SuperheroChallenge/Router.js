import { useEffect } from 'react';
import { useReducer } from 'react';
import { initialState, HeroReducer } from './services/state';
import { PersistentContextProvider } from 'react-persist-context'
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import Home from "./pages/Home";
import Login from './pages/Login'
import FindAHero from './pages/FindAHero'
import HeroDetails from './pages/HeroDetails'
import AlertTemplate from 'react-alert-template-basic'



const SuperHeroRouter = () => {
  
  const [state, dispatch] = useReducer(HeroReducer, initialState);
  const history = useHistory()
  const deviceWidth = window.innerWidth <= 426

  let user = localStorage.getItem('token')

  useEffect(() => {
    if(user){
      history.push('./Alkemy_Superhero')
    }
  },[history, user])

  const PrivateRoute = ({user, path, component}) => {
    if(user){
      return <Route path={path} component={component}/>
    }
    else{
      return <Redirect to='/Alkemy_Superhero/access' component={() => <Login/>}/>
    }
  }

  const store = {
    state: initialState,
    reducer: HeroReducer
  }

  if(state.isFetching){
    return (
      <h1>Fetching</h1>
    )
  }

  const alertOptions = {
    position: positions.TOP_CENTER,
    timeout: 2000,
    offset: '30px',
    transition: transitions.SCALE,
    containerStyle: {
      zIndex: 9999,
      fontSize: deviceWidth ? '2rem' : '2.5rem'
    }
  }

  return (
      <div className="Routes">
      <PersistentContextProvider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Switch>
            <Route path='/Alkemy_Superhero/access' component={Login}/>'
            <PrivateRoute user={user} path='/Alkemy_Superhero/hero-detail-:id' component={HeroDetails}/>
            <PrivateRoute user={user} path='/Alkemy_Superhero/find-a-hero' component={FindAHero} />
            <PrivateRoute user={user} path='/Alkemy_Superhero' component={Home}/>
          </Switch>
        </AlertProvider>
      </PersistentContextProvider>
      </div>
  )
}

export default SuperHeroRouter;
  