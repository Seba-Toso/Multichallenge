import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import {ADD_HERO, ADD_HERO_ERROR , ADD_HERO_SUCCESS , REMOVE_HERO , REMOVE_HERO_ERROR , REMOVE_HERO_SUCCESS } from './teamActions'
import {LOGGIN, LOGGIN_ERROR, LOGGIN_SUCCESS, GET_HEROES, GET_HEROES_ERROR, GET_HEROES_SUCCESS, GET_HEROE_DETAIL, GET_HEROE_DETAIL_ERROR,GET_HEROE_DETAIL_SUCCESS, CLEAR_FETCHING} from './formActions'
import {LOGGOUT, LOGGOUT_SUCCESS} from '../pages/Home'

//initial State
export const initialState = {
  isFetching: false,
  isLogged: false,
  error: false,
  findedHeroes: [],
  detailOf: [],
  team: {
    good: 0,
    bad: 0,
    heroes: [],
  }
}


//main reducer
export const heroReducer = (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case LOGGIN: 
      return {...state, isFetching: true, error: false};

    case LOGGIN_SUCCESS: 
      return {...state, isLogged: true, isFetching: false};

    case LOGGIN_ERROR: 
      return {...state, isLogged: false, isFetching: false, error: false};

    case LOGGOUT: 
      return {...state, isFetching: true, error: false};

    case LOGGOUT_SUCCESS: 
      return {...state, isFetching: false, isLogged: false, error: false};
    
    case GET_HEROES: 
      return {...state, isFetching: true, error: false};

    case GET_HEROES_SUCCESS: 
      return {...state, findedHeroes: action.payload, isFetching: false};

    case GET_HEROES_ERROR: 
      return {...state, isFetching: false, error: action.payload};

    case GET_HEROE_DETAIL: 
      return {...state, isFetching: true, error: false};

    case GET_HEROE_DETAIL_SUCCESS: 
      return {...state, detailOf: action.payload, isFetching: false};

    case GET_HEROE_DETAIL_ERROR: 
      return {...state, isFetching: false, error: action.payload};

    case ADD_HERO: 
      return {...state, isFetching: true};

    case ADD_HERO_SUCCESS: 
      return {...state, isFetching: false, team: action.payload};

    case ADD_HERO_ERROR:
      return {...state, isFetching: false}

    case REMOVE_HERO: 
      return {...state, isFetching: true};

    case REMOVE_HERO_SUCCESS: 
      return {...state, isFetching: false, team: action.payload};
      
    case REMOVE_HERO_ERROR: 
      return {...state, isFetching: false};

    case CLEAR_FETCHING: 
      return {...state, isFetching: false};
      
    default:
      return state;
  }
}


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

let rootReducer = combineReducers({
  heroReducer,
})


export default function generateStore(){
  let store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  )

  return store
}

