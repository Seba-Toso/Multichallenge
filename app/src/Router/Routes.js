import {
  Switch,
  Route,
} from "react-router-dom";

import MainHome from "../pages/MainHome";
import SuperHeroRouter from '../SuperheroChallenge/Router'

const MainRouter = () => {
    return (
        <div className="Routes">
          <Switch>
            <Route path='/Alkemy_Superhero'>
              <SuperHeroRouter path='/'/>
            </Route>
            <Route path="/">
                <MainHome />
            </Route>
          </Switch>
        </div>
    )
}

export default MainRouter;
