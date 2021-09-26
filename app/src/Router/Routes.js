import {
  Switch,
  Route,
} from "react-router-dom";
import generateHeroStore from '../SuperheroChallenge/services/state';
import { Provider } from 'react-redux'

import MainHome from "../pages/MainHome";
import SuperHeroRouter from '../SuperheroChallenge/Router'



const MainRouter = () => {

  let store = generateHeroStore()

    return (
        <div className="Routes">
          <Switch>
            <Route path='/Alkemy_Superhero'>
              <Provider store={store}>
                <SuperHeroRouter path='/'/>
              </Provider>
            </Route>
            <Route path="/">
                <MainHome />
            </Route>
          </Switch>
        </div>
    )
}

export default MainRouter;
