import { useEffect } from 'react';
import generateStore from './services/state';
import { Provider } from 'react-redux'
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import Home from "./pages/Home";
import Login from './pages/Login'
import FindAHero from './pages/FindAHero'
import HeroDetails from './pages/HeroDetails'
import AlertTemplate from 'react-alert-template-basic'



const SuperHeroRouter = () => {

  const history = useHistory()
  const deviceWidth = window.innerWidth <= 426

  let user = localStorage.getItem('token')


  useEffect(() => {
    if(user){
      history.push('/Alkemy_Superhero/home')
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

  let store = generateStore()

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
        <Provider store={store}>
          <AlertProvider template={AlertTemplate} {...alertOptions}>
            <Switch>
              <Route path='/Alkemy_Superhero/access' component={Login}/>'
              <PrivateRoute user={user} path='/Alkemy_Superhero/hero-detail-:id' component={HeroDetails}/>
              <PrivateRoute user={user} path='/Alkemy_Superhero/find-a-hero' component={FindAHero} />
              <PrivateRoute user={user} path='/Alkemy_Superhero/home' component={Home}/>
            </Switch>
          </AlertProvider>
        </Provider>
      </div>
  )
}

export default SuperHeroRouter;
  